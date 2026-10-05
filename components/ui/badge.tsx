import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "outline"
    | "rose"
    | "cream";
}

export function Badge({
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#315C4C] text-white border-transparent",
    secondary: "bg-[#F7F3F0] text-[#766F69] border-[#E8E1DC]",
    success: "bg-[#3F7D5A]/10 text-[#3F7D5A] border-[#3F7D5A]/20",
    warning: "bg-[#C58A32]/10 text-[#C58A32] border-[#C58A32]/20",
    destructive: "bg-[#B84A4A]/10 text-[#B84A4A] border-[#B84A4A]/20",
    outline: "text-[#24211F] border-[#E8E1DC] bg-white",
    rose: "bg-[#C97878]/15 text-[#C97878] border-[#C97878]/30",
    cream: "bg-[#F7EFE4] text-[#24211F] border-[#E8E1DC]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
