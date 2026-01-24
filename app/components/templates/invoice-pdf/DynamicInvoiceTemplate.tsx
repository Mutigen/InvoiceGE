"use client";

import React from "react";

// Types
import { InvoiceType } from "@/types";

// Templates
import InvoiceTemplate1 from "@/app/components/templates/invoice-pdf/InvoiceTemplate1";

const DynamicInvoiceTemplate = (props: InvoiceType) => {
    return <InvoiceTemplate1 {...props} />;
};

export default DynamicInvoiceTemplate;
