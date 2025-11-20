import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const hoverClass = hoverable ? "shadow-card-hover cursor-pointer" : "shadow-card";

  return (
    <div
      className={`card ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
