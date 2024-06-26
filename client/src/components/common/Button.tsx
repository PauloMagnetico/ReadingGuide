import classNames from 'classnames';
import React from 'react';
import { GoSync } from 'react-icons/go';

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  disabled,
  loading,
  ...rest
}) => {
  const classes = classNames(
    rest.className,
    'flex items-center px-3 py-1.5 border rounded',
    {
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
      'bg-gray-300 border-gray-300' : disabled,
      'hover:shadow-md' : !disabled
    }
  );

  //button should also be disabled when loading
  const isDisabled = () => disabled || loading;

  return (
    <button {...rest} disabled={isDisabled()} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

export default Button;
export type { ButtonProps };