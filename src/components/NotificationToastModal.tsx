// components/ui/NotificationModal.tsx
'use client';

import { useNotificationProvider } from '@/providers/NotificationProvider';
import clsx from 'clsx';

const typeStyles: Record<string, string> = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-500 border-red-500',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export const NotificationToastModal = () => {
  const { notification, hideNotification } = useNotificationProvider();  

  if (!notification || notification.mode !== 'toast') return null;

  const style = typeStyles[notification.type || 'info'];

  return (
    <div className="fixed bottom-10 right-10 z-50 w-[300px]">
      <div
        className={clsx(
          'px-4 py-3 relative flex items-center justify-between rounded-xl border shadow-md transition-all duration-300',
          style,
          notification ? 'animate-fade-slide-in' : 'animate-fade-slide-out'
        )}
      >        
        <p className="text-sm">{notification.message}</p>
        <button onClick={hideNotification}>
          X
        </button>
      </div>
    </div>
  );
};
