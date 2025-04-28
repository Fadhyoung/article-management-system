'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean | Notification;
  onClose: () => void;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  variation?: 'default' | 'danger' | 'success' | 'info';
  type?: 'sm' | 'md' | 'lg';
}

const variationClasses = {
  default: 'bg-white text-black border-gray-200',
  danger: 'bg-red-100 text-red-800 border-red-300',
  success: 'bg-green-100 text-green-800 border-green-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

const typeClasses = {
  sm: 'max-w-sm p-4',
  md: 'max-w-md p-6',
  lg: 'max-w-2xl p-8',
};

const Modal = ({
  isOpen,
  onClose,
  header,
  body,
  footer,
  variation = 'default',
  type = 'md',
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={onClose}
      />
      <div
        className={clsx(
          'relative z-10 rounded-2xl shadow-xl border w-full',
          variationClasses[variation],
          typeClasses[type]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {header && (
          <div className="flex justify-between items-center border-b pb-2">
            <div className="text-xl font-semibold">{header}</div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X />
            </button>
          </div>
        )}
        {body && <div className="py-4">{body}</div>}
        {footer && <div className="border-t pt-2 flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
