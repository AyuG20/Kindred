import React from "react";
import "./Card.css";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: React.ReactNode;
  variant?: "default" | "elevated";
}

export const Card = ({
  title,
  footer,
  variant = "default",
  className = "",
  children,
  ...rest
}: CardProps) => {
  return (
    <section
      className={`kindred-card kindred-card--${variant} ${className}`.trim()}
      {...rest}
    >
      {title && (
        <div className="kindred-card__header">
          <h2>{title}</h2>
        </div>
      )}

      <div className="kindred-card__body">
        {children}
      </div>

      {footer && (
        <div className="kindred-card__footer">
          {footer}
        </div>
      )}
    </section>
  );
};