"use client";

import { SubmitHandler } from "react-hook-form";
import { loginAction } from "./actions";
import { useTranslations } from "next-intl";
import {
  APP_ARTICLE_LIST_ARTICLE,
  APP_FORGOT_PASSWORD,
  APP_LIST_ARTICLE,
  ERR_INVALID_EMAIL_OR_PASSWORD,
} from "@/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/types/Auth";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useState } from "react";

export const useLogin = () => {
  const t = useTranslations("Login");
  const router = useRouter();

  const { showNotification } = useNotificationProvider();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSubmitLogin: SubmitHandler<LoginForm> = async (form) => {
    try {
      const response = await loginAction(form);
      if (response.isSuccess && response.data) {
        localStorage.setItem("profile", JSON.stringify(response.data));
        if (response.data.role == 'User') {
          router.push(APP_LIST_ARTICLE);
        } else if (response.data.role == 'Admin') {
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

  const goToForgotPasswordPage = () => {
    router.push(APP_FORGOT_PASSWORD);
  };

  return {
    t,
    control,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleSubmitLogin,
    handleSubmit,
    goToForgotPasswordPage,
  };
};
