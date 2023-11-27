import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        landingPrimary:
          "border-[3px] border-primaryButtonBorder bg-greenButtonBackground py-[4.5vw] text-[4vw] font-medium tracking-wider text-greenButtonText md:px-[4vw] md:py-[1.3vw] md:text-[1.4vw] md:hover:scale-110 w-1400:px-[56px] w-1400:py-[18px] w-1400:text-[18px]",
        landingSecondary:
          "gap-[16px] rounded-full border-[2px] border-secondaryButtonBorder bg-peach py-[4vw] text-[4vw] font-medium tracking-wider text-greenNavbarText md:px-[4vw] md:py-[1.32vw] md:text-[1.4vw] md:hover:scale-110 w-1400:px-[56px] w-1400:py-[18px] w-1400:text-[18px]",
        landingAppointment:
          "from-greenNavbarBackground relative z-[2] hidden cursor-pointer rounded-full border-[3px] border-appointmentButtonBorder bg-greenButtonBackground to-greenNavbarText px-[30px] py-[10px] text-lg font-medium tracking-wide text-offWhiteText shadow-sm hover:scale-[1.1] active:shadow-none md:flex lg:text-base xl:text-[18px]",
        landingContact:
          "flex items-center justify-center gap-2 border-[2px] border-contactButtonBorder bg-contactButtonBackground px-6 py-2.5 font-semibold tracking-wider text-greenNavbarText shadow-sm hover:scale-110 hover:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        action: "w-[70vw] rounded-full sm:w-[60vw] md:w-[auto]",
        datePicker: "h-10 px-3 py-2",
        contact:
          "h-[16vw] w-[50vw] rounded-full border-[2px] px-6 py-[10px] text-[4.8vw] tracking-wider shadow-sm md:h-[6vw] md:w-[20vw] md:text-[2vw] lg:h-auto lg:w-auto lg:text-[16px]",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
