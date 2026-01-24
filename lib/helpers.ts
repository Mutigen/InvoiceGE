// lib/helpers.ts (VOLLSTÄNDIG - Copy & Paste Ready)

// Next
import { NextResponse } from "next/server";

// Utils
import numberToWords from "number-to-words";

// Currencies
import currenciesDetails from "@/public/assets/data/currencies.json";
import { CurrencyDetails } from "@/types";

/**
 * Formats a number with commas and decimal places
 * @param number - Number to format
 * @returns A styled number to be displayed on the invoice
 */
const formatNumberWithCommas = (number: number) => {
    return number.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

/**
 * @param currency - The currency that is currently selected
 * @returns Object - An object containing the currency details
 */
const fetchCurrencyDetails = (currency: string): CurrencyDetails | null => {
    const data = currenciesDetails as Record<string, CurrencyDetails>;
    const currencyDetails = data[currency];
    return currencyDetails || null;
};

/**
 * Turns a number into words for invoices
 * @param price - Number to format
 * @returns Number in words
 */
const formatPriceToString = (price: number, currency: string): string => {
    // Initialize variables
    let decimals: number;
    let beforeDecimal: string | null = null;
    let afterDecimal: string | null = null;
    const currencyDetails = fetchCurrencyDetails(currency);

    // If currencyDetails is available, use its values, else dynamically set decimals
    if (currencyDetails) {
        decimals = currencyDetails.decimals;
        beforeDecimal = currencyDetails.beforeDecimal;
        afterDecimal = currencyDetails.afterDecimal;
    } else {
        // Dynamically get decimals from the price if currencyDetails is null
        const priceString = price.toString();
        const decimalIndex = priceString.indexOf(".");
        decimals = decimalIndex !== -1 ? priceString.split(".")[1].length : 0;
    }

    // Ensure the price is rounded to the appropriate decimal places
    const roundedPrice = parseFloat(price.toFixed(decimals));

    // Split the price into integer and fractional parts
    const integerPart = Math.floor(roundedPrice);
    const fractionalMultiplier = Math.pow(10, decimals);
    const fractionalPart = Math.round(
        (roundedPrice - integerPart) * fractionalMultiplier
    );

    // Convert the integer part to words with a capitalized first letter
    const integerPartInWords = numberToWords
        .toWords(integerPart)
        .replace(/^./, (c) => c.toUpperCase());

    // Convert fractional part to words
    const fractionalPartInWords =
        fractionalPart > 0 ? numberToWords.toWords(fractionalPart) : null;

    // Handle zero values for both parts
    if (integerPart === 0 && fractionalPart === 0) {
        return "Zero";
    }

    // Combine the parts into the final string
    let result = integerPartInWords;

    // Check if beforeDecimal is not null
    if (beforeDecimal !== null) {
        result += ` ${beforeDecimal}`;
    }

    // Add fractional part if it exists
    if (fractionalPartInWords !== null && afterDecimal !== null) {
        result += ` and ${fractionalPartInWords} ${afterDecimal}`;
    }

    return result;
};

/**
 * Flattens a nested object into a single level object with dot notation keys.
 * @param obj - The object to flatten
 * @param parentKey - The parent key for nested properties
 * @returns A flattened object
 */
const flattenObject = (
    obj: Record<string, any>,
    parentKey: string = ""
): Record<string, any> => {
    let result: Record<string, any> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (
                typeof obj[key] === "object" &&
                obj[key] !== null &&
                !Array.isArray(obj[key])
            ) {
                Object.assign(result, flattenObject(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
};

/**
 * Validates an email address.
 * @param email - The email address to validate
 * @returns true if valid, false otherwise
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Checks if a string is a data URL (base64 encoded image)
 * @param str - The string to check
 * @returns true if it's a data URL, false otherwise
 */
const isDataUrl = (str: string): boolean => {
    return /^data:image\/(png|jpg|jpeg|gif|svg\+xml);base64,/.test(str);
};

/**
 * Get the invoice template component dynamically.
 * Only Template 1 is available.
 * @param templateId - The template ID (currently only 1 is supported)
 * @returns The invoice template component
 */
export const getInvoiceTemplate = async (templateId: number) => {
    // Only Template 1 exists
    return (await import("@/app/components/templates/invoice-pdf/InvoiceTemplate1")).default;
};

/**
 * Convert a file to a buffer. Used for sending invoice as email attachment.
 * @param file - The file to convert to a buffer
 * @returns A promise that resolves to a buffer
 */
const fileToBuffer = async (file: File): Promise<Buffer> => {
    // Convert Blob to ArrayBuffer
    const arrayBuffer = await new NextResponse(file).arrayBuffer();
    // Convert ArrayBuffer to Buffer
    const pdfBuffer = Buffer.from(arrayBuffer);
    return pdfBuffer;
};

export {
    formatNumberWithCommas,
    formatPriceToString,
    flattenObject,
    isValidEmail,
    isDataUrl,
    fileToBuffer,
};
