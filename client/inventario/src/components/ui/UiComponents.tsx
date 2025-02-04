import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={`custom-input ${className || ""}`} {...props} />
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button className={`custom-button ${className || ""}`} {...props}>
    {children}
  </button>
);

export const Select: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`custom-select ${className || ""}`}>{children}</div>
);

export const SelectTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button className={`select-trigger ${className || ""}`} {...props}>
    {children}
  </button>
);

export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <span className="select-value">{placeholder}</span>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="select-content">{children}</div>
);

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <div className="select-item" data-value={value}>
    {children}
  </div>
);
