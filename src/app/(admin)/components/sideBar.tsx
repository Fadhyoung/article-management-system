'use client';

import { logoutAction } from "@/actions/Auth";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Typography from "@/components/Typography";
import { APP_ARTICLE_LIST_ARTICLE, APP_CATEGORY, APP_LOGIN } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationProvider } from "@/providers/NotificationProvider";

export const SideBar = () => {
  const {showNotification} = useNotificationProvider();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations('Navbar');

  const handleLogout = async () => {
    try {
      const response = await logoutAction();
      if (response.isSuccess) {
        router.push(APP_LOGIN)
        showNotification({
          type: "success",
          mode: "modal",
          message: 'Logout Success',
        });
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: 'Logout Failed',
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        mode: "modal",
        message: (error as Error).message,
      });
    }
  };
  return (
    <>
      <aside className="w-64 h-full bg-primary text-white flex flex-col gap-10 p-6">
        <Image
          src={"/images/img_icon_white.png"}
          alt="logo"
          width={150}
          height={150}
        />
        <nav className="flex flex-col gap-4">
          <Link
            href={APP_ARTICLE_LIST_ARTICLE}
            className="bg-blue-600 py-2 px-4 rounded-lg"
          >
            {t('articles')}
          </Link>
          <Link
            href={APP_CATEGORY}
            className="hover:bg-blue-600 py-2 px-4 rounded-lg"
          >
            {t('categories')}
          </Link>
          <Link
            href="#"
            className="hover:bg-blue-600 py-2 px-4 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            {t('logout')}
          </Link>
        </nav>
      </aside>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        body={
          <div className="flex flex-col gap-5 justify-center">
            <Typography type="cardtitle">{t('logout')}</Typography>
            <Typography type="body">{t('logoutConfirmation')}</Typography>
            <div className="w-fit flex gap-5 self-end">
              <Button
                type="button"
                variant="secondary"
                buttonType="outline"
                radius="md"
                className="border py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                radius="md"
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={handleLogout}
              >
                {t('logout')}
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
};
