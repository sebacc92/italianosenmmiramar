import { component$, Slot, $ } from "@builder.io/qwik";

export type ButtonVariant = "primary" | "secondary" | "neumorphic-green";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
  onClick$?: any;
}

export default component$<ButtonProps>((props) => {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    type = "button",
    class: className = "",
    onClick$
  } = props;

  const baseClasses = "btn inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105 hover:shadow-purple-500/25",
    secondary: "bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gray-200 hover:border-purple-600",
    "neumorphic-green": "bg-gradient-to-br from-emerald-500 to-emerald-800 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 hover:shadow-xl border border-emerald-400/20"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-8 py-3 text-base rounded-xl",
    lg: "px-10 py-4 text-lg rounded-xl"
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      class={classes}
      disabled={disabled}
      onClick$={$(() => {
        if (onClick$) {
          onClick$();
        }
      })}
    >
      <Slot />
    </button>
  );
});