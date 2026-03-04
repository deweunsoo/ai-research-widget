import React from 'react';
import './Button.css';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonColor = 'accent' | 'gray' | 'secondary' | 'error';
export type ButtonSize = '1' | '2' | '3' | '4' | '5' | '6' | '7';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style */
  variant?: ButtonVariant;
  /** Button color scheme */
  color?: ButtonColor;
  /** Button size (matches BTN height tokens) */
  size?: ButtonSize;
  /** Icon element */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right' | 'only';
  /** Show loading spinner */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  color = 'accent',
  size = '3',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const isIconOnly = iconPosition === 'only' || (!children && icon);

  const classNames = [
    'sds-btn',
    `sds-btn--${variant}`,
    `sds-btn--${color}`,
    `sds-btn--size-${size}`,
    isIconOnly && 'sds-btn--icon-only',
    fullWidth && 'sds-btn--full-width',
    isLoading && 'sds-btn--loading',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="sds-btn__spinner" />
      ) : (
        <>
          {icon && (iconPosition === 'left' || isIconOnly) && (
            <span className="sds-btn__icon">{icon}</span>
          )}
          {!isIconOnly && children && (
            <span className="sds-btn__label">{children}</span>
          )}
          {icon && iconPosition === 'right' && !isIconOnly && (
            <span className="sds-btn__icon">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
