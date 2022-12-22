import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"
import { capitalize } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type InputProps = ComponentProps<"input">

const inputStyles = cva(
    "my-0 block h-9 w-full rounded-md border py-2 px-3 text-sm  transition-all duration-100 focus:outline-none focus:ring-0 form-input",
    {
        variants: {
            intent: {
                primary:
                    "bg-palette-400 border-palette-300 placeholder:text-placeholder hover:border-slate-600 text-white focus:border-rose-500",
                search: "bg-appbg border-palette-300 placeholder:text-placeholder hover:border-slate-600 text-white focus:border-rose-500 pl-8",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props extends InputProps, VariantProps<typeof inputStyles> {
    register: UseFormRegister<FieldValues>
    isPending?: boolean
}

export function Input({
    intent = "primary",
    register,
    className,
    name,
    isPending = false,
    ...props
}: Props) {
    return (
        <>
            <div className="w-full relative">
                {isPending && (
                    <div className="absolute right-0 my-auto  inline-flex items-center h-full z-10">
                        <Icons.spinner className="mr-3 h-4 w-4 animate-spin text-brandtext-600" />
                    </div>
                )}
                {intent === "search" && (
                    <Icons.search
                        className="text-brandtext-600 absolute left-2 ml-1 top-0 bottom-0 m-auto h-full"
                        size={16}
                    />
                )}
                <input
                    {...register(name)}
                    className={cn(inputStyles({ intent }), className)}
                    {...props}
                />
            </div>
        </>
    )
}
