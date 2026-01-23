// Components
import { BaseButton, FormInput } from "@/app/components";

// Icons
import { Trash2 } from "lucide-react";

type FormCustomInputProps = {
    index: number;
    location: string;
    removeField: (index: number) => void;
};

const FormCustomInput = ({
    index,
    location,
    removeField,
}: FormCustomInputProps) => {
    const nameKey = `${location}[${index}].key`;
    const nameValue = `${location}[${index}].value`;
    return (
        <>
            <div className="flex items-center gap-2 w-full flex-wrap sm:flex-nowrap">
                <FormInput
                    name={nameKey}
                    className="font-medium p-0 border-none h-[1.5rem] w-full sm:w-[8rem] min-w-[4rem]"
                />

                <FormInput
                    name={nameValue}
                    className="w-full sm:flex-1"
                />
                <BaseButton
                    size="icon"
                    variant="destructive"
                    onClick={() => removeField(index)}
                    className="shrink-0"
                >
                    <Trash2 />
                </BaseButton>
            </div>
        </>
    );
};

export default FormCustomInput;
