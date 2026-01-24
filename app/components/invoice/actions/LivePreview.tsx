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
            <div className="border dark:border-gray-600 rounded-xl my-1">
                <DynamicInvoiceTemplate {...data} locale={locale} />
            </div>
        </>
    );
}
