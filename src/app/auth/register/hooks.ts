"use client";

import { SubmitHandler } from "react-hook-form";
import { registerAction } from "@/app/auth/register/actions";
import { useTranslations } from "next-intl";
import { APP_ARTICLE_LIST_ARTICLE, APP_LIST_ARTICLE, ERR_INVALID_EMAIL_OR_PASSWORD } from "@/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterForm } from "@/types/Auth";
import { useNotificationProvider } from "@/providers/NotificationProvider";

export const useRegister = () => {
  const t = useTranslations("Register");
  const router = useRouter();

  const { showNotification } = useNotificationProvider();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>();

  const handleSubmitRegister: SubmitHandler<RegisterForm> = async (form) => {
    try {
      const response = await registerAction(form);
      if (response.isSuccess && response.data) {
        localStorage.setItem("profile", JSON.stringify(response.data));
        showNotification({
          type: "success",
          mode: "modal",
          message: 'You Are Registered',
        });
        if (response.data.role == "User") {
          router.push(APP_LIST_ARTICLE);
        } else if (response.data.role == "Admin") {
          router.push(APP_ARTICLE_LIST_ARTICLE);
        }
      } else if (response.message == ERR_INVALID_EMAIL_OR_PASSWORD) {
        showNotification({
          type: "error",
          mode: "modal",
          message: t("invalidEmailOrPassword"),
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        mode: "modal",
        message: t("fetchFailed"),
      });
      if (process.env.NODE_ENV === "development") {
        console.error("Login error:", error);
      }
    }
  };

  return {
    t,
    control,
    errors,
    handleSubmitRegister,
    handleSubmit,
  };
};
