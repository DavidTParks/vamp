"use client"

import * as React from "react"
import * as AlertDialogPrimitives from "@radix-ui/react-alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type AlertProps = AlertDialogPrimitives.AlertDialogProps

export function Alert({ ...props }: AlertProps) {
    return <AlertDialogPrimitives.Root {...props} />
}

Alert.Trigger = React.forwardRef<
    HTMLButtonElement,
    AlertDialogPrimitives.AlertDialogTriggerProps
>(function AlertTrigger({ ...props }, ref) {
    return <AlertDialogPrimitives.Trigger {...props} ref={ref} />
})

Alert.Portal = AlertDialogPrimitives.Portal

Alert.Content = React.forwardRef<
    HTMLDivElement,
    AlertDialogPrimitives.AlertDialogContentProps
>(function AlertContent({ className, ...props }, ref) {
    return (
        <Alert.Portal>
            <AlertDialogPrimitives.Overlay className="fixed inset-0 z-40 opacity-100 transition-opacity animate-in fade-in backdrop-blur-sm	"></AlertDialogPrimitives.Overlay>
            <div className="fixed inset-0 z-40 flex items-center justify-center">
                <AlertDialogPrimitives.Content
                    ref={ref}
                    className={cn(
                        "fixed z-50 grid w-[95vw] max-w-md scale-100 gap-4 rounded-lg dropdown p-6 opacity-100 animate-in fade-in-90 zoom-in-90 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 md:w-full",
                        className
                    )}
                    {...props}
                />
            </div>
        </Alert.Portal>
    )
})

type AlertHeaderProps = React.HTMLAttributes<HTMLDivElement>

Alert.Header = function AlertHeader({ className, ...props }: AlertHeaderProps) {
    return <div className={cn("grid gap-1", className)} {...props} />
}

Alert.Title = React.forwardRef<
    HTMLHeadingElement,
    AlertDialogPrimitives.AlertDialogTitleProps
>(function AlertTitle({ className, ...props }, ref) {
    return (
        <AlertDialogPrimitives.Title
            ref={ref}
            className={cn(
                "text-lg font-semibold text-brandtext-500",
                className
            )}
            {...props}
        />
    )
})

Alert.Description = React.forwardRef<
    HTMLParagraphElement,
    AlertDialogPrimitives.AlertDialogDescriptionProps
>(function AlertDescription({ className, ...props }, ref) {
    return (
        <AlertDialogPrimitives.Description
            ref={ref}
            className={cn("text-sm text-brandtext-600", className)}
            {...props}
        />
    )
})

Alert.Footer = function AlertFooter({ className, ...props }: AlertHeaderProps) {
    return (
        <div
            className={cn("flex justify-end space-x-2", className)}
            {...props}
        />
    )
}

Alert.Cancel = React.forwardRef<
    HTMLButtonElement,
    AlertDialogPrimitives.AlertDialogCancelProps
>(function AlertCancel({ className, children, ...props }, ref) {
    return (
        <AlertDialogPrimitives.Cancel
            onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
            }}
            className={className}
            ref={ref}
            {...props}
        >
            <Button intent="secondary">{children}</Button>
        </AlertDialogPrimitives.Cancel>
    )
})

Alert.Action = React.forwardRef<
    HTMLButtonElement,
    AlertDialogPrimitives.AlertDialogActionProps
>(function AlertAction({ className, children, ...props }, ref) {
    return (
        <AlertDialogPrimitives.Action
            ref={ref}
            className={cn(className)}
            {...props}
        >
            <Button intent="danger">{children}</Button>
        </AlertDialogPrimitives.Action>
    )
})
