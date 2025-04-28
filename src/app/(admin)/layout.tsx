"use client";

import { APP_ARTICLE_LIST_ARTICLE, APP_CATEGORY, APP_LOGIN } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { BodyHeader } from "@/app/(admin)/components/bodyHeared";
import Modal from "@/components/Modal";
import { useModalProvider } from "@/providers/ModalProvider";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/Auth";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logoutAction();
      if (response.isSuccess) {
        router.push(APP_LOGIN)
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col gap-10 p-6">
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
            Articles
          </Link>
          <Link
            href={APP_CATEGORY}
            className="hover:bg-blue-600 py-2 px-4 rounded-lg"
          >
            Category
          </Link>
          <Link
            href="#"
            className="hover:bg-blue-600 py-2 px-4 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Logout
          </Link>
        </nav>
      </aside>
      <div className="w-full">
        <BodyHeader />
        {children}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        body={
          <div className="flex flex-col gap-5 justify-center">
            <Typography type="cardtitle"> Logout</Typography>
            <Typography type="body"> Are you sure want to logout? </Typography>
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
                Logout
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
