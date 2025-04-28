"use client";

import Navbar from "@/app/(user)/components/Navbar";
import ProfileComponent from "@/components/ProfileComponent";
import { APP_ARTICLE_LIST_ARTICLE } from "@/constants";
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
    <main className="h-full flex-1 justify-center items-center p-8">
      {/* NAVBAR */}
      <Navbar />
      <div className="h-full mt-32 flex justify-center items-center bg-white">
        <ProfileComponent data={profile} handleBack={goToDashboard} />
      </div>
    </main>
  );
}
