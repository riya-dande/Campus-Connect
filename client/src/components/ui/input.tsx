import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, Search, Loader2 } from "lucide-react"

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  isLoading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    clearable,
    onClear,
    isLoading,
    disabled,
    value,
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      const val = value as string | undefined
      setHasValue(!!val && String(val).length > 0)
    }, [value])

    const handleClear = () => {
      if (inputRef.current) {
        const event = new Event('input', { bubbles: true })
        inputRef.current.value = ""
        inputRef.current.dispatchEvent(event)
      }
      onClear?.()
    }

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}

          {isLoading && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}

          <input
            type={type}
            ref={(el) => {
              inputRef.current = el
              if (typeof ref === 'function') ref(el)
              else if (ref && 'current' in ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
              }
            }}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-transparent px-4 py-2 text-sm transition-all duration-200",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              (rightIcon || clearable || isLoading) && "pr-10",
              error 
                ? "border-destructive focus:ring-2 focus:ring-destructive/20" 
                : isFocused 
                  ? "border-primary focus:ring-2 focus:ring-primary/20" 
                  : "border-input",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <AnimatePresence>
              {clearable && hasValue && !disabled && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClear}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>

            {rightIcon && !clearable && !isLoading && (
              <div className="text-muted-foreground pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-destructive" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {hint && !error && (
          <p className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
