"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { APP_PROFILE } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const BodyHeader = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const path = usePathname();
  const lastSegment = path.split("/").filter(Boolean).pop();
  const formattedTitle = lastSegment
    ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

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
        <Typography type="cardtitle">{formattedTitle}</Typography>
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
