import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", error, label, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#24211F]"
          >
            {label}
            {props.required && <span className="text-[#B84A4A] ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`flex h-11 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#24211F] placeholder:text-[#766F69]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315C4C] disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-[#B84A4A] focus-visible:ring-[#B84A4A]"
              : "border-[#E8E1DC] focus-visible:border-[#315C4C]"
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-[11px] text-[#766F69]">{helperText}</p>
        )}
        {error && (
          <p className="text-xs font-medium text-[#B84A4A]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
