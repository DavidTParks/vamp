import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"
import { capitalize } from "@/lib/utils"
type InputProps = ComponentProps<"input">

const inputStyles = cva(
    "form-input my-0 mb-2 block h-9 w-full rounded-md border py-2 px-3 text-sm  transition-all duration-100 focus:outline-none focus:ring-none",
    {
        variants: {
            intent: {
                primary:
                    "bg-slate-900 border-slate-800 placeholder:text-slate-600 hover:border-slate-600 text-white focus:border-fuchsia-500",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props extends InputProps, VariantProps<typeof inputStyles> {
    register: UseFormRegister<FieldValues>
}

export function Input({ intent = "primary", register, name, ...props }: Props) {
    return (
        <>
            <input
                {...register(name)}
                className={inputStyles({ intent })}
                {...props}
            />
        </>
    )
}
