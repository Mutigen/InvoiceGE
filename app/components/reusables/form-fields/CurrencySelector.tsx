"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Hooks
import useCurrencies from "@/hooks/useCurrencies";

// Types
import { CurrencyType, NameType } from "@/types";

type CurrencySelectorProps = {
    name: NameType;
    label?: string;
    placeholder?: string;
};

const CurrencySelector = ({
    name,
    label,
    placeholder,
}: CurrencySelectorProps) => {
    const { control } = useFormContext();

    const { currencies, currenciesLoading } = useCurrencies();

    return (
        <div className="w-full">
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <div className="flex justify-between gap-3 sm:gap-5 items-center text-sm flex-wrap sm:flex-nowrap">
                            <div className="w-full sm:flex-1">
                                <FormLabel>{label}:</FormLabel>
                            </div>
                            <div className="w-full sm:flex-1">
                                <Select
                                    {...field}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent
                                        style={{
                                            overflowY: "hidden",
                                            height: "200px",
                                        }}
                                    >
                                        <SelectGroup>
                                            <SelectLabel>
                                                Currencies
                                            </SelectLabel>
                                            {!currenciesLoading &&
                                                currencies.map(
                                                    (
                                                        currency: CurrencyType,
                                                        idx: number
                                                    ) => (
                                                        <SelectItem
                                                            key={idx}
                                                            value={
                                                                currency.code
                                                            }
                                                        >
                                                            {currency.name}{" "}
                                                            {`(${currency.code})`}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default CurrencySelector;
