"use client";
import { use } from "react";
import { useFormContext } from "react-hook-form";

// Types
import { InvoiceType } from "@/types";

// Template
import InvoiceTemplate1 from "@/app/components/templates/invoice-pdf/InvoiceTemplate1";

type ViewTemplatePageProps = {
    params: Promise<{ id: string }>;
};

const ViewTemplate = (props: ViewTemplatePageProps) => {
    const params = use(props.params);
    const { getValues } = useFormContext();
    const formValues = getValues();

    return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <InvoiceTemplate1
                sender={formValues.sender}
                receiver={formValues.receiver}
                details={formValues.details}
            />
        </div>
    );
};

export default ViewTemplate;
