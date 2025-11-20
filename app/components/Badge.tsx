interface BadgeProps {
  variant?: "success" | "warning" | "error" | "primary" | "gray";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "primary",
  children,
  className = "",
}: BadgeProps) {
  const variantClasses = {
    success: "badge badge-success",
    warning: "badge badge-warning",
    error: "badge badge-error",
    primary: "badge badge-primary",
    gray: "bg-gray-200 text-gray-800",
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
