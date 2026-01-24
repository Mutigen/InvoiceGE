"use client";

// Next
import { Link } from "@/i18n/navigation";

// RHF
import { useFormContext } from "react-hook-form";

// Component
import { BaseButton } from "@/app/components";

// Variables
import { FORM_FILL_VALUES } from "@/lib/variables";

type DevDebugProps = {};

const DevDebug = ({}: DevDebugProps) => {
    const { reset, formState } = useFormContext();
    
    return (
        <div className="flex gap-4 border-2 border-red-500 rounded-md p-4">
            <div className="flex flex-col gap-2">
                <b>DEV Debug:</b>
                <p className="text-sm">
                    Form Status: {formState.isDirty ? "🟡 Dirty" : "🟢 Clean"}
                </p>
                <BaseButton
                    tooltipLabel="Fill form with test data"
                    variant="outline"
                    onClick={() => reset(FORM_FILL_VALUES)}
                >
                    Fill Test Data
                </BaseButton>
            </div>

            <div className="flex flex-col gap-2">
                <b>Template Preview:</b>
                <Link href={`/template/1`} className="text-blue-600 hover:underline">
                    📄 Template 1
                </Link>
            </div>
        </div>
    );
};

export default DevDebug;
