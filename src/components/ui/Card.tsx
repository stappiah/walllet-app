import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={
        "bg-white rounded-xl shadow-md p-4 border border-gray-200 " + className
      }
      {...props}
    >
      {children}
    </div>
  );
}
