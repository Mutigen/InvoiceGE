import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";

export async function generatePdfService(req: NextRequest) {
    const body: InvoiceType = await req.json();
    let browser;
    let page;

    try {
        const ReactDOMServer = (await import("react-dom/server")).default;
        const React = (await import("react")).default;
        const InvoiceTemplate = await getInvoiceTemplate(1);

        if (!InvoiceTemplate) {
            throw new Error(`Invoice template not found`);
        }

        const languageToLocale: Record<string, string> = {
            'English': 'en',
            'Deutsch': 'de',
            'ქართული': 'ka'
        };
        const locale = languageToLocale[body.details.language] || 'en';

        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
            React.createElement(InvoiceTemplate, { ...body, locale })
        );

        const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        ${htmlTemplate}
    </body>
    </html>
`;

        if (ENV === "production") {
            const puppeteer = (await import("puppeteer-core")).default;
            browser = await puppeteer.launch({
                args: [...chromium.args, "--disable-dev-shm-usage", "--ignore-certificate-errors"],
                executablePath: await chromium.executablePath(),
                headless: true,
            });
        } else {
            const puppeteer = (await import("puppeteer")).default;
            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            });
        }

        if (!browser) {
            throw new Error("Failed to launch browser");
        }

        page = await browser.newPage();
        await page.setContent(fullHtml, {
            waitUntil: ["networkidle0", "load", "domcontentloaded"],
            timeout: 30000,
        });
       // Wait for page to fully render
await new Promise(resolve => setTimeout(resolve, 2000));

        const pdf: Uint8Array = await page.pdf({
            format: "a4",
            printBackground: true,
            preferCSSPageSize: true,
        });

        return new NextResponse(new Blob([pdf], { type: "application/pdf" }), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=invoice.pdf",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            status: 200,
        });
    } catch (error: any) {
        console.error("PDF Generation Error:", error);
        return new NextResponse(
            JSON.stringify({ 
                error: "Failed to generate PDF", 
                details: error.message 
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } finally {
        if (page) {
            try {
                await page.close();
            } catch (e) {
                console.error("Error closing page:", e);
            }
        }
        if (browser) {
            try {
                const pages = await browser.pages();
                await Promise.all(pages.map((p) => p.close()));
                await browser.close();
            } catch (e) {
                console.error("Error closing browser:", e);
            }
        }
    }
}
