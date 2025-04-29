'use client';

import React from 'react';
import clsx from 'clsx';
import { useNotificationProvider } from '@/providers/NotificationProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { X } from 'lucide-react';

const typeStyles: Record<string, string> = {
  success: 'border-green-300',
  error: 'border-red-500',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export const NotificationModal = () => {
  const { notification, hideNotification } = useNotificationProvider();

  if (!notification || notification.mode !== 'modal') return null;

  const style = typeStyles[notification.type || 'info'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={hideNotification}
      />
      <div
        className={clsx(
          'w-1/3 p-10  relative z-10 flex flex-col gap-12 justify-center items-center text-center rounded-2xl shadow-xl text-black border bg-white',
          style,
          notification ? 'animate-fade-slide-in' : 'animate-fade-slide-out'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          icon={<X />}
          buttonType="ghost"
          variant="secondary"
          radius="md"
          size='md'
          className="absolute top-2 right-2"
          onClick={hideNotification}
        />
        {notification.type === 'success' ? (
          <>
            <Typography type="cardtitle" variant="success">
              Permintaan Berhasil
            </Typography>
          </>
        ) : (
          <>
            <Typography type="cardtitle" variant="danger">
              Gagal Terhubung ke Server
            </Typography>
          </>
        )}
        {notification.message}
      </div>
    </div>
  );
};
