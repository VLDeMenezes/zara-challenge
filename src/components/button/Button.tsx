import React from "react";
import styles from "./Button.module.css";

/**
 * Reusable button component.
 *
 * Supports multiple visual variants and sizes while exposing
 * all native HTML button attributes.
 *
 * @example
 * <Button variant="primary">
 *   <span>Add to Cart</span>
 * </Button>
 *
 * @example
 * <Button variant="destroy">
 *   <span>Delete Product</span>
 * </Button>
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual appearance of the button.
   */
  variant?: "primary" | "secondary" | "destroy";
  /**
   * Controls button dimensions.
   */
  size?: "medium" | "large";
  /**
   * Adds additional height to the button.
   */
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
