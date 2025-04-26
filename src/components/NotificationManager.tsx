'use client';

import { NotificationToastModal } from '@/components/NotificationToastModal';
import { NotificationModal } from '@/components/NotificationModal';
import { useNotificationProvider } from '@/providers/NotificationProvider';

export const NotificationManager = () => {
  const { notification } = useNotificationProvider();

  if (!notification) return null;

  switch (notification.mode) {
    case 'toast':
      return <NotificationToastModal />;
    case 'modal':
      return <NotificationModal />;
    default:
      return null;
  }
};
