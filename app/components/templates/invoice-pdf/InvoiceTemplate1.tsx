import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { SHORT_DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

// Translation dictionary für PDF-Generierung
const translations: Record<string, Record<string, string>> = {
    en: {
        "pdf.billFrom": "BILL FROM",
        "pdf.taxID": "Tax ID",
        "pdf.invoice": "INVOICE",
        "pdf.invoiceDate": "INVOICE DATE",
        "pdf.dueDate": "DUE DATE",
        "pdf.invoiceNumber": "INVOICE NUMBER",
        "pdf.billTo": "BILL TO",
        "pdf.item": "ITEM",
        "pdf.quantity": "QTY",
        "pdf.unit": "UNIT",
        "pdf.unitPrice": "UNIT PRICE",
        "pdf.amount": "AMOUNT",
        "pdf.paymentInstructions": "Payment Instructions",
        "pdf.bank": "Bank",
        "pdf.accountName": "Account Name",
        "template.iban": "IBAN",
        "template.swift": "SWIFT",
        "template.director": "Director",
        "pdf.paymentTerms": "Payment Terms",
        "pdf.additionalNotes": "Additional Notes",
        "pdf.questionsContact": "Questions? Contact us",
        "pdf.subtotal": "Subtotal",
        "pdf.discount": "Discount",
        "pdf.tax": "Tax",
        "pdf.shipping": "Shipping",
        "pdf.total": "Total",
        "pdf.totalInWords": "Total in words",
        "pdf.signature": "Signature",
    },
    de: {
        "pdf.billFrom": "RECHNUNG VON",
        "pdf.taxID": "Steuernummer",
        "pdf.invoice": "RECHNUNG",
        "pdf.invoiceDate": "RECHNUNGSDATUM",
        "pdf.dueDate": "FÄLLIGKEITSDATUM",
        "pdf.invoiceNumber": "RECHNUNGSNUMMER",
        "pdf.billTo": "RECHNUNG AN",
        "pdf.item": "ARTIKEL",
        "pdf.quantity": "MENGE",
        "pdf.unit": "EINHEIT",
        "pdf.unitPrice": "EINZELPREIS",
        "pdf.amount": "BETRAG",
        "pdf.paymentInstructions": "Zahlungshinweise",
        "pdf.bank": "Bank",
        "pdf.accountName": "Kontoinhaber",
        "template.iban": "IBAN",
        "template.swift": "SWIFT",
        "template.director": "Direktor",
        "pdf.paymentTerms": "Zahlungsbedingungen",
        "pdf.additionalNotes": "Zusätzliche Hinweise",
        "pdf.questionsContact": "Fragen? Kontaktieren Sie uns",
        "pdf.subtotal": "Zwischensumme",
        "pdf.discount": "Rabatt",
        "pdf.tax": "Steuer",
        "pdf.shipping": "Versand",
        "pdf.total": "Gesamt",
        "pdf.totalInWords": "Gesamt in Worten",
        "pdf.signature": "Unterschrift",
    },
    ka: {
        "pdf.billFrom": "გამგზავნი",
        "pdf.taxID": "საიდენტიფიკაციო ნომერი",
        "pdf.invoice": "ინვოისი",
        "pdf.invoiceDate": "თარიღი",
        "pdf.dueDate": "ვადა",
        "pdf.invoiceNumber": "ინვოისის ნომერი",
        "pdf.billTo": "დამკვეთი",
        "pdf.item": "პროდუქტი",
        "pdf.quantity": "რაოდ.",
        "pdf.unit": "ზომის ერთეული",
        "pdf.unitPrice": "ერთეულის ფასი",
        "pdf.amount": "ღირებულება",
        "pdf.paymentInstructions": "ანგარიშსწორება",
        "pdf.bank": "ბანკი",
        "pdf.accountName": "ანგარიშის სახელი",
        "template.iban": "ანგარიშის #",
        "template.swift": "ბანკის კოდი",
        "template.director": "დირექტორი",
        "pdf.paymentTerms": "გადახდის პირობები",
        "pdf.additionalNotes": "დამატებითი შენიშვნები",
        "pdf.questionsContact": "კითხვები? დაგვიკავშირდით",
        "pdf.subtotal": "შუალედური ჯამი",
        "pdf.discount": "ფასდაკლება",
        "pdf.tax": "გადასახადი",
        "pdf.shipping": "მიწოდება",
        "pdf.total": "სულ",
        "pdf.totalInWords": "სულ სიტყვებით",
        "pdf.signature": "ხელმოწერა",
    },
};

// Erweitere InvoiceType um locale
type InvoiceTemplateProps = InvoiceType & { locale?: string };

const InvoiceTemplate = (data: InvoiceTemplateProps) => {
    const { sender, receiver, details, locale = 'en' } = data;
    
    // Lokale Translation-Funktion
    const _t = (key: string): string => {
        return translations[locale]?.[key] || translations['en'][key] || key;
    };

    const subtotalExVat = Number(details.subTotal) || 0;
    const taxRate = Number(details.taxDetails?.amount ?? 0);
    const taxAmount =
        details.taxDetails?.amountType === "percentage"
            ? (subtotalExVat * taxRate) / 100
            : taxRate;

    return (
        <InvoiceLayout data={data}>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start gap-6">
                    <div className="w-1/2 pr-4">
                        {details.invoiceLogo && (
                            <img
                                src={details.invoiceLogo}
                                width={150}
                                height={80}
                                alt={`Logo of ${sender.name}`}
                                className="mb-4 object-contain"
                            />
                        )}
                        <p className="text-xs text-gray-500 uppercase font-semibold">
                            {_t("pdf.billFrom")}
                        </p>
                        <h2 className="font-semibold text-lg mb-1">
                            {sender.name}
                        </h2>
                        <div className="text-sm text-gray-600 space-y-0.5">
                            {sender.taxID && (
                                <p>
                                    {_t("pdf.taxID")}: {sender.taxID}
                                </p>
                            )}
                            {sender.address && <p>{sender.address}</p>}
                            {(sender.zipCode || sender.city || sender.country) && (
                                <p>
                                    {sender.zipCode ? `${sender.zipCode} ` : ""}
                                    {sender.city ? `${sender.city}, ` : ""}
                                    {sender.country}
                                </p>
                            )}
                            {sender.phone && <p>{sender.phone}</p>}
                            {sender.email && <p>{sender.email}</p>}
                        </div>
                    </div>

                    <div className="w-1/3 text-right">
                        <h1 className="text-2xl font-semibold text-gray-800 uppercase mb-4">
                            {_t("pdf.invoice")}
                        </h1>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">
                                    {_t("pdf.invoiceDate")}
                                </p>
                                <p className="font-semibold">
                                    {details.invoiceDate
                                        ? new Date(details.invoiceDate).toLocaleDateString(
                                              undefined,
                                              SHORT_DATE_OPTIONS
                                          )
                                        : ""}
                                </p>
                            </div>
                            {details.dueDate && (
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        {_t("pdf.dueDate")}
                                    </p>
                                    <p className="font-semibold">
                                        {new Date(details.dueDate).toLocaleDateString(
                                            undefined,
                                            SHORT_DATE_OPTIONS
                                        )}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-gray-500 uppercase">
                                    {_t("pdf.invoiceNumber")}
                                </p>
                                <p className="font-semibold text-blue-600">
                                    {details.invoiceNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Receiver */}
                <div className="border border-gray-200 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                        {_t("pdf.billTo")}
                    </p>
                    <h3 className="font-semibold text-lg mb-1">
                        {receiver.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                        {receiver.taxID && (
                            <p className="mb-1">
                                {_t("pdf.taxID")}: {receiver.taxID}
                            </p>
                        )}
                        {receiver.address && <p>{receiver.address}</p>}
                        {(receiver.zipCode || receiver.city || receiver.country) && (
                            <p>
                                {receiver.zipCode ? `${receiver.zipCode} ` : ""}
                                {receiver.city ? `${receiver.city}, ` : ""}
                                {receiver.country}
                            </p>
                        )}
                    </div>
                </div>

                {/* Items Table */}
                <div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="py-2 text-left font-semibold w-12">#</th>
                                <th className="py-2 text-left font-semibold">
                                    {_t("pdf.item")}
                                </th>
                                <th className="py-2 text-center font-semibold w-20">
                                    {_t("pdf.quantity")}
                                </th>
                                <th className="py-2 text-center font-semibold w-20">
                                    {_t("pdf.unit")}
                                </th>
                                <th className="py-2 text-right font-semibold w-28">
                                    {_t("pdf.unitPrice")}
                                </th>
                                <th className="py-2 text-right font-semibold w-32">
                                    {_t("pdf.amount")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {details.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-3 text-left text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 text-left font-medium">
                                        {item.name}
                                        {item.description && (
                                            <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">
                                                {item.description}
                                            </p>
                                        )}
                                    </td>
                                    <td className="py-3 text-center">
                                        {item.quantity}
                                    </td>
                                    <td className="py-3 text-center text-gray-500">
                                        {item.unit || "-"}
                                    </td>
                                    <td className="py-3 text-right">
                                        {formatNumberWithCommas(
                                            Number(item.unitPrice)
                                        )}
                                    </td>
                                    <td className="py-3 text-right font-semibold">
                                        {formatNumberWithCommas(Number(item.total))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer: Bank/Notes left, Totals right */}
                <div className="flex justify-between items-start pt-6 border-t border-gray-200">
                    <div className="w-1/2 text-sm text-gray-600 space-y-4">
                        <div>
                            <p className="font-semibold text-gray-800 mb-1">
                                {_t("pdf.paymentInstructions")}:
                            </p>
                            <p>
                                <span className="font-medium">
                                    {_t("pdf.bank")}:
                                </span>{" "}
                                {details.paymentInformation?.bankName}
                            </p>
                            {details.paymentInformation?.accountName && (
                                <p>
                                    <span className="font-medium">
                                        {_t("pdf.accountName")}:
                                    </span>{" "}
                                    {details.paymentInformation.accountName}
                                </p>
                            )}
                            {sender.iban && (
                                <p>
                                    <span className="font-medium">
                                        {_t("template.iban")}:
                                    </span>{" "}
                                    {sender.iban}
                                </p>
                            )}
                            {sender.swift && (
                                <p>
                                    <span className="font-medium">
                                        {_t("template.swift")}:
                                    </span>{" "}
                                    {sender.swift}
                                </p>
                            )}
                            {sender.directorName && (
                                <p>
                                    <span className="font-medium">
                                        {_t("template.director")}:
                                    </span>{" "}
                                    {sender.directorName}
                                </p>
                            )}
                        </div>

                        {details.paymentTerms && (
                            <p>
                                <span className="font-medium">
                                    {_t("pdf.paymentTerms")}:
                                </span>{" "}
                                {details.paymentTerms}
                            </p>
                        )}

                        {details.additionalNotes && (
                            <div className="text-xs text-gray-600">
                                <span className="font-semibold">
                                    {_t("pdf.additionalNotes")}:
                                </span>{" "}
                                {details.additionalNotes}
                            </div>
                        )}

                        {(sender.email || sender.phone) && (
                            <div className="text-xs text-gray-600">
                                <p className="font-medium">
                                    {_t("pdf.questionsContact")}:
                                </p>
                                {sender.email && <p>{sender.email}</p>}
                                {sender.phone && <p>{sender.phone}</p>}
                            </div>
                        )}
                    </div>

                    <div className="w-5/12">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">
                                {_t("pdf.subtotal")}:
                            </span>
                            <span className="font-medium">
                                {formatNumberWithCommas(subtotalExVat)}{" "}
                                {details.currency}
                            </span>
                        </div>

                        {details.discountDetails?.amount != undefined &&
                            details.discountDetails?.amount > 0 && (
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">
                                        {_t("pdf.discount")}:
                                    </span>
                                    <span className="font-medium">
                                        {details.discountDetails.amountType ===
                                        "amount"
                                            ? `- ${details.discountDetails.amount} ${details.currency}`
                                            : `- ${details.discountDetails.amount}%`}
                                    </span>
                                </div>
                            )}

                        {details.taxDetails?.amount != undefined &&
                            details.taxDetails?.amount > 0 && (
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">
                                        {_t("pdf.tax")}
                                        {details.taxDetails.amountType ===
                                        "percentage"
                                            ? ` (${taxRate}%)`
                                            : ""}
                                        :
                                    </span>
                                    <span className="font-medium">
                                        {details.taxDetails.amountType ===
                                        "amount"
                                            ? `+ ${details.taxDetails.amount} ${details.currency}`
                                            : `+ ${formatNumberWithCommas(
                                                  taxAmount
                                              )} ${details.currency}`}
                                    </span>
                                </div>
                            )}

                        {details.shippingDetails?.cost != undefined &&
                            details.shippingDetails?.cost > 0 && (
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">
                                        {_t("pdf.shipping")}:
                                    </span>
                                    <span className="font-medium">
                                        {details.shippingDetails.costType ===
                                        "amount"
                                            ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                            : `+ ${details.shippingDetails.cost}%`}
                                    </span>
                                </div>
                            )}

                        <div className="flex justify-between py-3 text-lg font-semibold">
                            <span>{_t("pdf.total")}:</span>
                            <span className="text-blue-600">
                                {formatNumberWithCommas(
                                    Number(details.totalAmount)
                                )}{" "}
                                {details.currency}
                            </span>
                        </div>

                        {details.totalAmountInWords && (
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">
                                    {_t("pdf.totalInWords")}:
                                </span>{" "}
                                {details.totalAmountInWords} {details.currency}
                            </div>
                        )}
                    </div>
                </div>

                {/* Signature */}
                {details?.signature?.data &&
                isDataUrl(details?.signature?.data) ? (
                    <div className="mt-6">
                        <p className="font-semibold text-gray-800">
                            {_t("pdf.signature")}:
                        </p>
                        <img
                            src={details.signature.data}
                            width={120}
                            height={60}
                            alt={`Signature of ${sender.name}`}
                        />
                    </div>
                ) : details.signature?.data ? (
                    <div className="mt-6">
                        <p className="text-gray-800">
                            {_t("pdf.signature")}:
                        </p>
                        <p
                            style={{
                                fontSize: 30,
                                fontWeight: 400,
                                fontFamily: `${details.signature.fontFamily}, cursive`,
                                color: "black",
                            }}
                        >
                            {details.signature.data}
                        </p>
                    </div>
                ) : null}
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate;
