"use client";

import { useLocale } from "next-intl";
import { DynamicInvoiceTemplate, Subheading } from "@/app/components";
import { InvoiceType } from "@/types";

type LivePreviewProps = {
    data: InvoiceType;
};

export default function LivePreview({ data }: LivePreviewProps) {
    const locale = useLocale();

    return (
        <>
            <Subheading>Live Preview:</Subheading>
            <div className="light">
                <div className="border border-gray-300 rounded-xl my-1 bg-white p-6 shadow-sm">
                    <DynamicInvoiceTemplate {...data} locale={locale} />
                </div>
            </div>
        </>
    );
}
