"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Components
import {
  PdfViewer,
  BaseButton,
  NewInvoiceAlert,
  InvoiceLoaderModal,
  InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FileInput, FolderUp, Import, Plus, RotateCcw } from "lucide-react";

const InvoiceActions = () => {
  const { invoicePdfLoading, newInvoice } = useInvoiceContext();

  const { _t } = useTranslationContext();
  return (
    <div className="w-full min-w-0 h-full">
      <Card className="h-full flex flex-col px-2">
        <CardHeader>
          <CardTitle>{_t("actions.title")}</CardTitle>
          <CardDescription>{_t("actions.description")}</CardDescription>
        </CardHeader>

        <div className="flex flex-col items-center gap-2 flex-1 min-h-0">
          <div className="flex flex-wrap gap-3">
            {/* Load modal button */}
            <InvoiceLoaderModal>
              <BaseButton
                variant="outline"
                tooltipLabel={_t("actions.loadInvoiceTooltip")}
                disabled={invoicePdfLoading}
              >
                <FolderUp />
                {_t("actions.loadInvoice")}
              </BaseButton>
            </InvoiceLoaderModal>

            {/* Export modal button */}
            <InvoiceExportModal>
              <BaseButton
                variant="outline"
                tooltipLabel={_t("actions.exportInvoiceTooltip")}
                disabled={invoicePdfLoading}
              >
                <Import />
                {_t("actions.exportInvoice")}
              </BaseButton>
            </InvoiceExportModal>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* New invoice button */}
            <NewInvoiceAlert>
              <BaseButton
                variant="outline"
                tooltipLabel={_t("actions.newInvoiceTooltip")}
                disabled={invoicePdfLoading}
              >
                <Plus />
                {_t("actions.newInvoice")}
              </BaseButton>
            </NewInvoiceAlert>

            {/* Reset form button */}
            <NewInvoiceAlert
              title={_t("actions.resetFormTitle")}
              description={_t("actions.resetFormDescription")}
              confirmLabel={_t("actions.resetFormConfirm")}
              onConfirm={newInvoice}
            >
              <BaseButton
                variant="destructive"
                tooltipLabel={_t("actions.resetFormTooltip")}
                disabled={invoicePdfLoading}
              >
                <RotateCcw />
                {_t("actions.resetFormButton")}
              </BaseButton>
            </NewInvoiceAlert>

            {/* Generate pdf button */}
            <BaseButton
              type="submit"
              tooltipLabel={_t("actions.generatePdfTooltip")}
              loading={invoicePdfLoading}
              loadingText={_t("actions.generatePdfLoading")}
            >
              <FileInput />
              {_t("actions.generatePdf")}
            </BaseButton>
          </div>

          <div className="w-full flex-1 min-h-0">
            {/* Live preview and Final pdf */}
            <PdfViewer />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceActions;
