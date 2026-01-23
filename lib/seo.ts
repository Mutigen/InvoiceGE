import { AUTHOR_WEBSITE, BASE_URL } from "@/lib/variables";

export const ROOTKEYWORDS = [
    "invoice",
    "invoice generator",
    "invoice generating",
    "invoice app",
    "invoice generator app",
    "free invoice generator",
];

export const JSONLD = {
    "@context": "https://schema.org",
    "@type": "Website",
    name: "Mamikos InvoiceGE",
    description: "An Invoice Generator Web App",
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
