import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.95rem] font-medium transition-colors duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-oak-green text-white hover:bg-oak-green-dark",
  secondary:
    "bg-oak-amber text-oak-charcoal hover:bg-oak-amber-dark hover:text-white",
  outline:
    "border border-oak-charcoal/20 text-oak-charcoal hover:border-oak-green hover:text-oak-green",
  ghost: "text-oak-charcoal hover:text-oak-green",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
