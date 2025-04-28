"use client";

import { Profile } from "@/types/User";
import { createContext, useContext, useState } from "react";

interface ProfileState {
    profile: Profile | undefined;
    setProfile: (profile: Profile) => void;
}

const profileContext = createContext<ProfileState>({
  profile: undefined,
  setProfile: () => {},
});

export const useProfile = () => useContext(profileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  console.log(profile);

  return (
    <profileContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};
