import { AUTHOR_WEBSITE, BASE_URL } from "@/lib/variables";

export const ROOTKEYWORDS = [
    "Mamikos InvoiceGE",
    "Georgian invoice generator",
    "Georgia VAT invoice",
    "VAT / დღგ invoice",
    "tax compliant invoices Georgia",
    "multilingual invoice app",
    "PDF invoice maker",
    "email invoice export",
    "Next.js invoice app",
    "professional invoice template",
];

export const JSONLD = {
    "@context": "https://schema.org",
    "@type": "Website",
    name: "Mamikos InvoiceGE",
    description:
        "Mamikos InvoiceGE ist ein professioneller georgischer Rechnungsgenerator mit VAT/დღგ-Unterstützung, mehrsprachigen Vorlagen sowie PDF- und E-Mail-Export.",
    keywords: ROOTKEYWORDS,
    url: BASE_URL,
    image: `${BASE_URL}/_next/static/media/mamikosinvoice-logo.svg`,
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#website`,
    },
    author: {
        "@type": "Organization",
        name: "InvoiceGE Team",
        url: AUTHOR_WEBSITE,
    },
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            url: `${BASE_URL}`,
        },
    ],
};
