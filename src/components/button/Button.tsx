import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destroy";
  size?: "medium" | "large";
  extraHeight?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  extraHeight = false,
  ...props
}) => {
  // 2.
  const buttonClasses = [
    styles["btn"],
    styles[`btn--${size}`],
    styles[`btn--${variant}`],
    extraHeight ? styles["btn--extra-height"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
