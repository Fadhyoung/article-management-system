"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { APP_PROFILE } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const BodyHeader = () => {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUsername(profile.username);
    }
  }, []);

  const goToProfilePage = () => {
    router.push(APP_PROFILE);
  };

  return (
    <>
      <header className="w-full py-4 px-10 flex items-center justify-between border bg-background2">
        <Typography type="cardtitle">{t('articles')}</Typography>
        <div className="flex items-center gap-2">
          <Button
            buttonType="ghost"
            variant="secondary"
            onClick={goToProfilePage}
          >
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <Typography type="subtitle">{username}</Typography>
          </Button>
        </div>
      </header>
    </>
  );
};
