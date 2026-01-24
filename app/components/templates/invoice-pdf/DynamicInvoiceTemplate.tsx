"use client";

import React from "react";

// Types
import { InvoiceType } from "@/types";

// Templates
import InvoiceTemplate1 from "@/app/components/templates/invoice-pdf/InvoiceTemplate1";

interface DynamicInvoiceTemplateProps extends InvoiceType {
    locale: string;
}

const DynamicInvoiceTemplate = (props: DynamicInvoiceTemplateProps) => {
    return <InvoiceTemplate1 {...props} />;  // ✅ Alle Props inkl. locale!
};

export default DynamicInvoiceTemplate;
