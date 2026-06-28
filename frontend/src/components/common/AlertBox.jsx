import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

export const AlertBox = ({ type = 'info', message, title = '', onClose = null }) => {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      message: 'text-green-800',
      Icon: FiCheckCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-800',
      Icon: FiXCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      message: 'text-yellow-800',
      Icon: FiAlertCircle,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-800',
      Icon: FiInfo,
    },
  };

  const style = styles[type] || styles.info;
  const { Icon } = style;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${style.bg} border-l-4 ${style.border} ${style.bg} p-4 rounded-lg flex gap-3 items-start`}
    >
      <Icon className={`${style.icon} text-2xl flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <p className={`${style.title} font-bold`}>{title}</p>}
        <p className={style.message}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
};
