"use client";

// ShadCn
import { Skeleton } from "@/components/ui/skeleton";
// Types
import { InvoiceType } from "@/types";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const DynamicInvoiceTemplateSkeleton = () => {
    return <Skeleton className="min-h-[60rem]" />;
};

const DynamicInvoiceTemplate = (props: InvoiceType) => {
    // Dynamic template component name
    const templateName = `InvoiceTemplate${props.details.pdfTemplate}`;

    // Extract locale from language
    const languageToLocale: Record<string, string> = {
        'English': 'en',
        'Deutsch': 'de',
        'ქართული': 'ka'
    };
    const locale = languageToLocale[props.details.language] || 'en';

    const DynamicInvoice = useMemo(
        () =>
            dynamic<InvoiceType & { locale?: string }>(
                () =>
                    import(
                        `@/app/components/templates/invoice-pdf/${templateName}`
                    ),
                {
                    loading: () => <DynamicInvoiceTemplateSkeleton />,
                    ssr: false,
                }
            ),
        [templateName]
    );

    return <DynamicInvoice {...props} locale={locale} />;
};

export default DynamicInvoiceTemplate;
