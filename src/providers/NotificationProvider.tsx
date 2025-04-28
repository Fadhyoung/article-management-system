"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type Notification = {
  message: string;
  type?: "error" | "success" | "info" | "warning";
  mode?: "toast" | "modal";
};

interface NotificationState {
  // MODAL STATE
  isOpen: boolean;
  setIsOpen: (key: boolean) => void;

  isNotification: boolean;
  setIsNotification: (key: boolean) => void;
  notification: Notification | null;

  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationState>({
  isOpen: false,
  setIsOpen: () => {},

  isNotification: false,
  setIsNotification: () => {},
  notification: null,

  showNotification: () => {},
  hideNotification: () => {},
});

export const useNotificationProvider = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Notification, duration?: number) => {
    setNotification(notification);
    setIsNotification(true);

    if (typeof duration === "number") {
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }
  };

  const hideNotification = () => setNotification(null);

  const pathname = usePathname();

  useEffect(() => {
    if (notification?.mode === "toast") {
      setNotification(null);
    }
  }, [pathname]);

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isNotification,
        setIsNotification,
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
