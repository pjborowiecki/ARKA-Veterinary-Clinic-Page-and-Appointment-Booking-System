import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid items-center", {
  variants: {
    variant: {
      default: "container gap-8 pb-8 pt-6 md:py-8",
      centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
      landingConstrained:
        "w-full max-w-[1440px] mx-auto px-[20px] md:px-[24px] lg:px-[28px]",
      landingFullWidth: "w-full max-w-[2560px] mx-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }
