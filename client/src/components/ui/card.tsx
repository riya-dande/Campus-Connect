import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  interactive?: boolean
  variant?: "default" | "elevated" | "outlined" | "ghost"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, interactive = false, variant = "default", ...props }, ref) => {
    const variants = {
      default: "border bg-card text-card-foreground shadow",
      elevated: "border-0 bg-card text-card-foreground shadow-lg",
      outlined: "border-2 bg-card text-card-foreground",
      ghost: "bg-transparent border-0",
    }

    const interactiveClasses = interactive ? "cursor-pointer" : ""

    if (hover || interactive) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            variants[variant],
            "rounded-xl transition-all duration-200",
            interactiveClasses,
            className
          )}
          whileHover={{ 
            y: -4, 
            boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.99 }}
          {...(props as any)}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          "rounded-xl",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
