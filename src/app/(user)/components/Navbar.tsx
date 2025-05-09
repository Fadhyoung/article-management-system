import { logoutAction } from "@/actions/Auth";
import Button from "@/components/Button";
import { APP_LOGIN, APP_USER_PROFILE } from "@/constants";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography";
import { useTranslations } from "next-intl";
import { useNotificationProvider } from "@/providers/NotificationProvider";

interface NavbarProps {
  className?: string;
  imageUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className, imageUrl }) => {
  const { showNotification } = useNotificationProvider();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("Navbar");

  const handleLogout = async () => {
    try {
      const response = await logoutAction();
      if (response.isSuccess) {
        router.push(APP_LOGIN);
        showNotification({
          type: "success",
          mode: "modal",
          message: "Logout Success",
        });
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: "Logout Failed",
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

  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUsername(profile.username);
    }
  }, []);

  return (
    <div
      className={clsx(
        "w-full py-5 px-10 md:px-40 fixed left-0 top-0 z-50 flex justify-between items-center border-b bg-white",
        className
      )}
    >
      <Image
        src={imageUrl || "/images/img_icon.png"}
        alt="logo"
        width={150}
        height={150}
        className="bg-transparent"
      />
      <Button
        variant="primary"
        buttonType="ghost"
        className="flex items-center"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="bg-primary bg-opacity-20 rounded-full p-1 mr-2">
          <User size={24} className="text-white" />
        </div>
        <Typography type="subtitle" className={clsx(className)}>
          {username}
        </Typography>
      </Button>

      {/* Modal */}
      {isDropdownOpen && (
        <div
          className="absolute top-full right-20 mt-2 p-2 w-48 bg-white border rounded-lg shadow-md z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={APP_USER_PROFILE}
            className="block px-4 py-2 text-sm !text-black hover:bg-gray-100"
          >
            {t("myAccount")}
          </Link>
          <Button variant="danger" buttonType="ghost" onClick={handleLogout}>
            <LogOut />
            {t("logout")}
          </Button>
        </div>
      )}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
