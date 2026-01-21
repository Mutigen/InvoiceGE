import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

// Variables
import { SHORT_DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate3 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    // Calculate VAT exclusive subtotal if tax is included
    const taxRate = details.taxDetails?.amount || 18;
    const subtotalExVat = details.subTotal;
    const vatAmount = (subtotalExVat * taxRate) / 100;
    const totalWithVat = subtotalExVat + vatAmount;

    return (
        <InvoiceLayout data={data}>
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-gray-300 pb-4">
                <div className="flex flex-col">
                    {details.invoiceLogo && (
                        <img
                            src={details.invoiceLogo}
                            width={120}
                            height={80}
                            alt={`Logo of ${sender.name}`}
                            className="mb-2"
                        />
                    )}
                    <h1 className="text-xl font-bold text-gray-900">
                        {sender.name}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Invoice Date:</span>{" "}
                        {new Date(details.invoiceDate).toLocaleDateString(
                            "en-US",
                            SHORT_DATE_OPTIONS
                        )}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Invoice Number:</span>{" "}
                        <span className="text-blue-600 font-bold">
                            {details.invoiceNumber}
                        </span>
                    </p>
                </div>
            </div>

            {/* Bill To & Bank Details Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Bill To */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                        Bill To:
                    </h3>
                    <p className="font-semibold text-gray-900">
                        {receiver.name}
                    </p>
                    {receiver.taxID && (
                        <p className="text-sm text-gray-600">
                            Tax ID: {receiver.taxID}
                        </p>
                    )}
                    {receiver.address && (
                        <p className="text-sm text-gray-600">
                            {receiver.address}
                        </p>
                    )}
                    {(receiver.city || receiver.country) && (
                        <p className="text-sm text-gray-600">
                            {receiver.city}
                            {receiver.city && receiver.country && ", "}
                            {receiver.country}
                        </p>
                    )}
                    {receiver.phone && (
                        <p className="text-sm text-gray-600">
                            Phone: {receiver.phone}
                        </p>
                    )}
                </div>

                {/* Bank Details */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                        Bank Details:
                    </h3>
                    {sender.swift && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Bank:</span>{" "}
                            {details.paymentInformation?.bankName || "N/A"}
                        </p>
                    )}
                    {sender.swift && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">SWIFT:</span>{" "}
                            {sender.swift}
                        </p>
                    )}
                    {sender.iban && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">IBAN:</span>{" "}
                            {sender.iban}
                        </p>
                    )}
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Currency:</span>{" "}
                        {details.currency}
                    </p>
                    {sender.directorName && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Director:</span>{" "}
                            {sender.directorName}
                        </p>
                    )}
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-700 w-12">
                                #
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-700">
                                Description
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-20">
                                Qty
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-24">
                                Unit
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-28">
                                Price
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-32">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-sm">
                                    <p className="font-medium text-gray-900">
                                        {item.name}
                                    </p>
                                    {item.description && (
                                        <p className="text-xs text-gray-600 whitespace-pre-line">
                                            {item.description}
                                        </p>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                                    {item.quantity}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                                    {item.unit || "-"}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-right text-sm">
                                    {formatNumberWithCommas(item.unitPrice)}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-right text-sm font-medium">
                                    {formatNumberWithCommas(item.total)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-6">
                <div className="w-80 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                        <span className="text-sm text-gray-700">
                            Subtotal (ex VAT):
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                            {formatNumberWithCommas(subtotalExVat)}{" "}
                            {details.currency}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                        <span className="text-sm text-gray-700">
                            VAT ({taxRate}%):
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                            {formatNumberWithCommas(vatAmount)}{" "}
                            {details.currency}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-base font-bold text-gray-900">
                            TOTAL:
                        </span>
                        <span className="text-base font-bold text-blue-600">
                            {formatNumberWithCommas(totalWithVat)}{" "}
                            {details.currency}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            {details.additionalNotes && (
                <div className="mt-6 border-t border-gray-300 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Additional Notes:
                    </h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                        {details.additionalNotes}
                    </p>
                </div>
            )}
        </InvoiceLayout>
    );
};

export default InvoiceTemplate3;
