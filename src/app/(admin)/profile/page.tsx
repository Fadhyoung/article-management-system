"use client";

import ProfileComponent from "@/components/ProfileComponent";
import { APP_ARTICLE_LIST_ARTICLE, APP_PROFILE } from "@/constants";
import { Profile } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfile(profile);
    }
  }, []);

  const goToDashboard = () => {
    router.push(APP_ARTICLE_LIST_ARTICLE);
  };

  return (
    <main className="h-full flex-1 p-8">
      <div className="h-full flex justify-center items-center bg-white">
        <ProfileComponent data={profile} handleBack={goToDashboard} />
      </div>
    </main>
  );
}
