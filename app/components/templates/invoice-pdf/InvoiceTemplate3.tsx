"use client";

import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

// Variables
import { SHORT_DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

// Hooks (Neu aus Template 1)
import { useTranslationContext } from "@/contexts/TranslationContext";

const InvoiceTemplate3 = (data: InvoiceType & { locale?: string }) => {
    const { sender, receiver, details } = data;
    
    // Das Übersetzungssystem aktivieren
    const { _t } = useTranslationContext();

    // Berechnung der Beträge
    const taxRate = details.taxDetails?.amount || 18;
    const subtotalExVat = details.subTotal || 0;
    const vatAmount = (subtotalExVat * taxRate) / 100;
    const totalWithVat = subtotalExVat + vatAmount;

    return (
        <InvoiceLayout data={data}>
            {/* PAPER MODE WRAPPER: Erzwingt weißes Papier-Design auch im Dark Mode */}
            <div className="bg-white text-slate-900 p-8 rounded-sm shadow-lg min-h-[1123px] w-full max-w-[210mm] mx-auto [&_*]:text-slate-900">
                
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
                        <h1 className="text-xl font-bold">{sender.name}</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">{_t("pdf.invoiceDate")}:</span>{" "}
                            {details.invoiceDate ? new Date(details.invoiceDate).toLocaleDateString(
                                // Nutzt die aktive Sprache oder Fallback
                                undefined, 
                                SHORT_DATE_OPTIONS
                            ) : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">{_t("pdf.invoiceNumber")}:</span>{" "}
                            {/* Blau überschreibt die Standard-Schwarz-Regel */}
                            <span className="text-blue-600 font-bold">
                                {details.invoiceNumber}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Bill From, Bill To & Bank Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    {/* Bill From */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                            {/* Falls "pdf.billFrom" nicht existiert, nutze "Von:" oder Sender Name */}
                            {_t("pdf.billFrom") || "Sender"}:
                        </h3>
                        <p className="font-semibold">{sender.name}</p>
                        {sender.taxID && (
                            <p className="text-sm text-gray-600">
                                {_t("pdf.taxID") || "Tax ID"}: {sender.taxID}
                            </p>
                        )}
                        {sender.address && (
                            <p className="text-sm text-gray-600">{sender.address}</p>
                        )}
                        {(sender.zipCode || sender.city) && (
                            <p className="text-sm text-gray-600">
                                {sender.zipCode && `${sender.zipCode}, `}{sender.city}
                            </p>
                        )}
                        {sender.country && (
                            <p className="text-sm text-gray-600">{sender.country}</p>
                        )}
                        {sender.email && (
                            <p className="text-sm text-gray-600">Email: {sender.email}</p>
                        )}
                        {sender.phone && (
                            <p className="text-sm text-gray-600">Tel: {sender.phone}</p>
                        )}
                    </div>

                    {/* Bill To */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                            {_t("pdf.billTo")}:
                        </h3>
                        <p className="font-semibold">
                            {receiver.name}
                        </p>
                        {receiver.taxID && (
                            <p className="text-sm text-gray-600">
                                {_t("pdf.taxID") || "Tax ID"}: {receiver.taxID}
                            </p>
                        )}
                        {receiver.address && (
                            <p className="text-sm text-gray-600">
                                {receiver.address}
                            </p>
                        )}
                        {(receiver.zipCode || receiver.city) && (
                            <p className="text-sm text-gray-600">
                                {receiver.zipCode && `${receiver.zipCode}, `}{receiver.city}
                            </p>
                        )}
                        {receiver.country && (
                            <p className="text-sm text-gray-600">{receiver.country}</p>
                        )}
                        {receiver.email && (
                            <p className="text-sm text-gray-600">Email: {receiver.email}</p>
                        )}
                        {receiver.phone && (
                            <p className="text-sm text-gray-600">
                                Tel: {receiver.phone}
                            </p>
                        )}
                    </div>

                    {/* Bank Details */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                            {_t("pdf.paymentInstructions")}:
                        </h3>
                        {details.paymentInformation?.bankName && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">{_t("pdf.bank") || "Bank"}:</span>{" "}
                                {details.paymentInformation.bankName}
                            </p>
                        )}
                        {details.paymentInformation?.accountName && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">{_t("pdf.accountName")}:</span>{" "}
                                {details.paymentInformation.accountName}
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
                            <span className="font-semibold">{_t("pdf.currency") || "Currency"}:</span>{" "}
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
                <div className="mb-6 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-700 w-12">
                                    №
                                </th>
                                <th className="border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-700">
                                    {_t("pdf.item")}
                                </th>
                                <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-20">
                                    {_t("pdf.quantity")}
                                </th>
                                <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-24">
                                    {_t("pdf.unit") || "Unit"}
                                </th>
                                <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-28">
                                    {_t("pdf.unitPrice")}
                                </th>
                                <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-32">
                                    {_t("pdf.amount")}
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
                                        <p className="font-medium">
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
                    <div className="w-full max-w-md border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                            <span className="text-sm text-gray-700">
                                {_t("pdf.subtotal")}:
                            </span>
                            <span className="text-sm font-semibold">
                                {formatNumberWithCommas(subtotalExVat)}{" "}
                                {details.currency}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                            <span className="text-sm text-gray-700">
                                {_t("pdf.tax")} ({taxRate}%):
                            </span>
                            <span className="text-sm font-semibold">
                                {formatNumberWithCommas(vatAmount)}{" "}
                                {details.currency}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-base font-bold">
                                {_t("pdf.total")}:
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
                            {_t("pdf.additionalNotes")}:
                        </h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                            {details.additionalNotes}
                        </p>
                    </div>
                )}
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate3;