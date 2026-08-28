import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-button font-outfit font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple disabled:opacity-40 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-grad-purple text-white shadow-purple-glow hover:shadow-[0_0_40px_rgba(108,99,255,0.8)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-transparent border border-border text-text-primary hover:border-purple hover:bg-white/5",
        teal: "bg-teal text-bg-base hover:bg-teal-dark shadow-[0_0_20px_rgba(0,201,167,0.4)] hover:scale-[1.02]",
        danger:
          "bg-transparent border border-purple/40 text-text-purple hover:border-purple hover:bg-purple/10",
        ghost: "bg-transparent text-text-muted hover:text-text-primary hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  full?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, full, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          full && "w-full"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
