"use client";

import { useFormContext } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InvoiceActions, InvoiceForm } from "@/app/components";
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { InvoiceType } from "@/types";

const InvoiceMain = () => {
    const { handleSubmit } = useFormContext<InvoiceType>();
    const { onFormSubmit } = useInvoiceContext();

    return (
        <Form {...useFormContext<InvoiceType>()}>
            <form
                onSubmit={handleSubmit(onFormSubmit, (err) => console.log(err))}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
            >
                <div className="md:col-span-6 lg:col-span-6 space-y-6 min-w-0">
                    <InvoiceForm />
                </div>
                <aside className="md:col-span-6 lg:col-span-6 lg:sticky top-8 space-y-4 min-w-0 h-full">
                    <InvoiceActions />
                </aside>
            </form>
        </Form>
    );
};

export default InvoiceMain;
