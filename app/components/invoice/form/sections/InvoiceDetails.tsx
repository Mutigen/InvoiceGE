"use client";

import { useEffect } from "react";

// RHF
import { useFormContext } from "react-hook-form";

// Components
import {
    BaseButton,
    CurrencySelector,
    DatePickerFormField,
    FormInput,
    FormFile,
    Subheading,
    TemplateSelector,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Helpers
import { generateInvoiceNumber, previewNextInvoiceNumber } from "@/lib/invoiceNumbering";

// Icons
import { RefreshCw } from "lucide-react";

const InvoiceDetails = () => {
    const { _t } = useTranslationContext();
    const { watch, setValue } = useFormContext();

    const currentInvoiceNumber = watch("details.invoiceNumber");

    // Auto-generate invoice number if empty
    useEffect(() => {
        if (!currentInvoiceNumber || currentInvoiceNumber === "") {
            const newNumber = previewNextInvoiceNumber();
            setValue("details.invoiceNumber", newNumber);
        }
    }, []);

    const handleGenerateNewNumber = () => {
        const newNumber = generateInvoiceNumber();
        setValue("details.invoiceNumber", newNumber);
    };

    return (
        <section className="flex flex-col flex-wrap gap-5">
            <Subheading>{_t("form.steps.invoiceDetails.heading")}:</Subheading>

            <div className="flex flex-row flex-wrap gap-5">
                <div className="flex flex-col gap-2">
                    <FormFile
                        name="details.invoiceLogo"
                        label={_t(
                            "form.steps.invoiceDetails.invoiceLogo.label"
                        )}
                        placeholder={_t(
                            "form.steps.invoiceDetails.invoiceLogo.placeholder"
                        )}
                    />

                    <div className="flex flex-col gap-2">
                        <FormInput
                            name="details.invoiceNumber"
                            label={_t("form.steps.invoiceDetails.invoiceNumber")}
                            placeholder={_t(
                                "form.steps.invoiceDetails.invoiceNumberPlaceholder"
                            )}
                        />
                        <BaseButton
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleGenerateNewNumber}
                            className="w-fit"
                        >
                            <RefreshCw className="w-4 h-4" />
                            {_t("form.steps.invoiceDetails.generateNewNumber")}
                        </BaseButton>
                    </div>

                    <DatePickerFormField
                        name="details.invoiceDate"
                        label={_t("form.steps.invoiceDetails.issuedDate")}
                    />

                    <DatePickerFormField
                        name="details.dueDate"
                        label={_t("form.steps.invoiceDetails.dueDate")}
                    />

                    <CurrencySelector
                        name="details.currency"
                        label={_t("form.steps.invoiceDetails.currency")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <TemplateSelector />
                </div>
            </div>
        </section>
    );
};

export default InvoiceDetails;
