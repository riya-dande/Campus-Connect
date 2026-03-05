import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Enhanced button variants with premium states
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border shadow-md shadow-destructive/20 hover:shadow-lg hover:shadow-destructive/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        outline:
          "border-2 border-border bg-transparent hover:bg-accent hover:border-accent-foreground/30 active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary-border shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        success:
          "bg-green-600 text-white border border-green-700 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  animate?: boolean
}

// Spinner component
const Spinner = () => (
  <motion.svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
)

// Checkmark component
const Checkmark = () => (
  <motion.svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </motion.svg>
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    animate = true,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || isLoading

    const buttonContent = (
      <>
        {isLoading ? (
          <>
            <Spinner />
            <span>{loadingText || "Loading..."}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </>
    )

    // If animation is enabled, use wrapper motion element.
    if (animate && !asChild) {
      return (
        <motion.div
          className={cn(
            buttonVariants({ variant, size, className }),
            "cursor-pointer",
            isDisabled && "cursor-not-allowed"
          )}
          whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isDisabled ? { scale: 0.98 } : {}}
        >
          <Comp
            className="flex items-center justify-center w-full h-full"
            ref={ref}
            disabled={isDisabled}
            {...props}
          >
            {buttonContent}
          </Comp>
        </motion.div>
      )
    }

    // Non-animated version
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
