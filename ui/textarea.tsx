import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"

type TextAreaProps = ComponentProps<"textarea">

const textAreaStyles = cva(
    "form-textarea my-0 mb-2 h-24 block w-full rounded-md border py-2 px-3 text-sm  transition-all duration-100 focus:outline-none focus:ring-none placeholder:text-placeholder",
    {
        variants: {
            intent: {
                primary:
                    "bg-palette-400 border-palette-300 placeholder:text-placeholder hover:border-slate-600 text-white focus:border-rose-500",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props
    extends TextAreaProps,
        VariantProps<typeof textAreaStyles> {
    register: UseFormRegister<FieldValues>
}

export function TextArea({
    intent = "primary",
    register,
    name,
    ...props
}: Props) {
    return (
        <>
            <textarea
                {...register(name)}
                className={textAreaStyles({ intent })}
                {...props}
            />
        </>
    )
}
