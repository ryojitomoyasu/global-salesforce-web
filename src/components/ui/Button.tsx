import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            outline: "border border-border bg-transparent shadow-sm hover:bg-muted hover:text-foreground",
            ghost: "hover:bg-muted hover:text-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-sm px-4 text-xs",
            lg: "h-12 rounded-sm px-8",
            icon: "h-11 w-11",
        }

        return (
            <Comp
                className={cn(baseClass, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
