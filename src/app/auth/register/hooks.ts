"use client";

import { SubmitHandler } from "react-hook-form";
import { registerAction } from "@/app/auth/register/actions";
import { useTranslations } from "next-intl";
import {
  APP_DASHBOARD,
  APP_FORGOT_PASSWORD,
  ERR_INVALID_EMAIL_OR_PASSWORD,
} from "@/constants";
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

  const handleSubmitLogin: SubmitHandler<RegisterForm> = async (form) => {
    try {
      const response = await registerAction(form);
      if (response.isSuccess && response.data) {
        router.push(APP_DASHBOARD);
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

  const goToForgotPasswordPage = () => {
    router.push(APP_FORGOT_PASSWORD);
  };

  return {
    t,
    control,
    errors,
    handleSubmitLogin,
    handleSubmit,
    goToForgotPasswordPage,
  };
};
