import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

// Variables
import { SHORT_DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate3 = (data: InvoiceType & { locale?: string }) => {
    const { sender, receiver, details, locale = 'ka' } = data; // Standardmäßig auf 'ka' für Georgisch

    // Berechnung der Beträge
    const taxRate = details.taxDetails?.amount || 18;
    const subtotalExVat = details.subTotal || 0;
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                        {sender.name}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                        <span className="font-semibold text-gray-900 dark:text-slate-200">ინვოისის თარიღი:</span>{" "}
                        {details.invoiceDate ? new Date(details.invoiceDate).toLocaleDateString(
                            "ka-GE",
                            SHORT_DATE_OPTIONS
                        ) : ''}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                        <span className="font-semibold text-gray-900 dark:text-slate-200">ინვოისის ნომერი:</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                            {details.invoiceNumber}
                        </span>
                    </p>
                </div>

            {/* Bill From, Bill To & Bank Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {/* Bill From */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                        გამომგზავნი:
                    </h3>
                    <p className="font-semibold text-gray-900">{sender.name}</p>
                    {sender.taxID && (
                        <p className="text-sm text-gray-600">
                            საიდენტიფიკაციო კოდი: {sender.taxID}
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
                        <p className="text-sm text-gray-600">ელ-ფოსტა: {sender.email}</p>
                    )}
                    {sender.phone && (
                        <p className="text-sm text-gray-600">ტელეფონი: {sender.phone}</p>
                    )}
                </div>

                {/* Bill To */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                        მიმღები:
                    </h3>
                    <p className="font-semibold text-gray-900">
                        {receiver.name}
                    </p>
                    {receiver.taxID && (
                        <p className="text-sm text-gray-600">
                            საიდენტიფიკაციო კოდი: {receiver.taxID}
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
                        <p className="text-sm text-gray-600">ელ-ფოსტა: {receiver.email}</p>
                    )}
                    {receiver.phone && (
                        <p className="text-sm text-gray-600">
                            ტელეფონი: {receiver.phone}
                        </p>
                    )}
                </div>

                {/* Bank Details */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
                        საბანკო რეკვიზიტები:
                    </h3>
                    {details.paymentInformation?.bankName && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">ბანკი:</span>{" "}
                            {details.paymentInformation.bankName}
                        </p>
                    )}
                    {details.paymentInformation?.accountName && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">ანგარიშის დასახელება:</span>{" "}
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
                        <span className="font-semibold">ვალუტა:</span>{" "}
                        {details.currency}
                    </p>
                    {sender.directorName && (
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">დირექტორი:</span>{" "}
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
                                აღწერა
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-20">
                                რაოდ.
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-700 w-24">
                                ერთეული
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-28">
                                ფასი
                            </th>
                            <th className="border border-gray-300 px-2 py-2 text-right text-xs font-semibold text-gray-700 w-32">
                                ჯამი
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
                <div className="w-full max-w-md border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                        <span className="text-sm text-gray-700">
                            ჯამი დღგ-ს გარეშე:
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                            {formatNumberWithCommas(subtotalExVat)}{" "}
                            {details.currency}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                        <span className="text-sm text-gray-700">
                            დღგ ({taxRate}%):
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                            {formatNumberWithCommas(vatAmount)}{" "}
                            {details.currency}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-base font-bold text-gray-900">
                            სულ გადასახდელი:
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
                        დამატებითი შენიშვნები:
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