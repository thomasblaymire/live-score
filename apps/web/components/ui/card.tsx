import { ReactNode } from "react";

interface CardProps {
  heading?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ heading, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface border border-gray-800 rounded-[15px] ${className}`}
    >
      {heading && (
        <div className="px-6 py-4 border-b border-gray-800 rounded-t-[16px]">
          <h3 className="text-white text-sm font-semibold">{heading}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
