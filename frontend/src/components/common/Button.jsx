import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick = null,
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-bubble-primary to-bubble-secondary text-white hover:shadow-bubble',
    secondary: 'bg-gradient-to-r from-blue-400 to-bubble-accent text-white hover:shadow-bubble',
    success: 'bg-gradient-to-r from-bubble-success to-green-500 text-white hover:shadow-bubble',
    outline: 'border-2 border-bubble-primary text-bubble-primary bg-transparent hover:bg-bubble-primary hover:text-white',
    ghost: 'text-bubble-primary hover:bg-bubble-light',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = 'rounded-bubble font-semibold transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      {...props}
    >
      {Icon && <Icon className="text-xl" />}
      {children}
    </motion.button>
  );
};
