// Types
import { SignatureColor, SignatureFont } from "@/types";

/**
 * Environment
 */
export const ENV = process.env.NODE_ENV;

/**
 * Websites
 */
export const BASE_URL = "https://invoicege.example.com";
export const AUTHOR_WEBSITE = "https://github.com/Mutigen";
export const AUTHOR_GITHUB = "https://github.com/Mutigen/InvoiceGE";

/**
 * API endpoints
 */
export const GENERATE_PDF_API = "/api/invoice/generate";
export const SEND_PDF_API = "/api/invoice/send";
export const EXPORT_INVOICE_API = "/api/invoice/export";

/**
 * External API endpoints
 */
export const CURRENCIES_API =
  "https://openexchangerates.org/api/currencies.json";

/**
 * Local storage
 */
export const LOCAL_STORAGE_INVOICE_DRAFT_KEY = "Mamikos_invoiceGE:invoiceDraft";

/**
 * Tailwind
 */
export const TAILWIND_CDN =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

/**
 * Nodemailer
 */
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
export const NODEMAILER_PW = process.env.NODEMAILER_PW;

/**
 * I18N
 */
export const LOCALES = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "ka", name: "ქართული" },
];
export const DEFAULT_LOCALE = LOCALES[0].code;

/**
 * Signature variables
 */
export const SIGNATURE_COLORS: SignatureColor[] = [
  { name: "black", label: "Black", color: "rgb(0, 0, 0)" },
  { name: "dark blue", label: "Dark Blue", color: "rgb(0, 0, 128)" },
  {
    name: "crimson",
    label: "Crimson",
    color: "#DC143C",
  },
];

export const SIGNATURE_FONTS: SignatureFont[] = [
  {
    name: "Dancing Script",
    variable: "var(--font-dancing-script)",
  },
  { name: "Parisienne", variable: "var(--font-parisienne)" },
  {
    name: "Great Vibes",
    variable: "var(--font-great-vibes)",
  },
  {
    name: "Alex Brush",
    variable: "var(--font-alex-brush)",
  },
];

/**
 * Form date options
 */
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

/**
 * Form defaults
 */
export const FORM_DEFAULT_VALUES = {
  sender: {
    name: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    taxID: "",
    swift: "",
    iban: "",
    directorName: "",
    customInputs: [],
  },
  receiver: {
    name: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    taxID: "",
    customInputs: [],
  },
  details: {
    invoiceLogo: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    items: [
      {
        name: "",
        description: "",
        quantity: 0,
        unit: "",
        unitPrice: 0,
        total: 0,
      },
    ],
    currency: "USD",
    language: "English",
    taxDetails: {
      amount: 18,
      amountType: "percentage",
      taxID: "",
    },
    discountDetails: {
      amount: 0,
      amountType: "amount",
    },
    shippingDetails: {
      cost: 0,
      costType: "amount",
    },
    paymentInformation: {
      bankName: "",
      accountName: "",
    },
    additionalNotes: "",
    paymentTerms: "",
    totalAmountInWords: "",
    pdfTemplate: 3,
  },
};

/**
 * ? DEV Only
 * Form auto fill values for testing
 */
export const FORM_FILL_VALUES = {
  sender: {
    name: "Giorgi Beridze",
    address: "Rustaveli Ave 10",
    zipCode: "0108",
    city: "Tbilisi",
    country: "Georgia",
    email: "giorgi.beridze@example.ge",
    phone: "+995 599 123 456",
    taxID: "GE123456789",
    swift: "TBCBGE22",
    iban: "GE29TB1234567890123456",
    directorName: "Giorgi Beridze",
  },
  receiver: {
    name: "Anna Mueller",
    address: "Prenzlauer Allee 45",
    zipCode: "10405",
    city: "Berlin",
    country: "Germany",
    email: "anna.mueller@example.de",
    phone: "+49 30 123456",
  },
  details: {
    invoiceLogo: "",
    invoiceNumber: "GE-2026-001",
    invoiceDate: new Date(),
    dueDate: new Date(),
    items: [
      {
        name: "Software Lizenz",
        description: "Jahreslizenz mit VAT/დღგ konformer Rechnung",
        quantity: 1,
        unitPrice: 500,
        total: 500,
      },
      {
        name: "Support & Wartung",
        description: "Monatliches Paket (Remote + SLA)",
        quantity: 6,
        unitPrice: 80,
        total: 480,
      },
      {
        name: "Beratung vor Ort",
        description: "Implementierung in Tbilisi, Tagessatz",
        quantity: 3,
        unitPrice: 200,
        total: 600,
      },
    ],
    currency: "GEL",
    language: "Deutsch",
    taxDetails: {
      amount: 18,
      amountType: "percentage",
      taxID: "GE987654321",
    },
    discountDetails: {
      amount: 0,
      amountType: "percentage",
    },
    shippingDetails: {
      cost: 0,
      costType: "amount",
    },
    paymentInformation: {
      bankName: "TBC Bank",
      accountName: "Giorgi Beridze",
    },
    additionalNotes: "Vielen Dank für die Zusammenarbeit",
    paymentTerms: "Zahlbar innerhalb von 14 Tagen",
    signature: {
      data: "",
    },
    subTotal: "1580",
    totalAmount: "1864.4",
    totalAmountInWords: "One thousand eight hundred sixty four",
    pdfTemplate: 3,
  },
};
