"use client";

import { useTranslations } from "next-intl";
import { useCategory } from "@/providers/CategoryProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { APP_ARTICLE_FORM, APP_ARTICLE_LIST_ARTICLE } from "@/constants";
import { ArticleForm } from "@/types/Articles";
import { useState } from "react";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import postArticleAction from "@/app/(admin)/articles/form/actions";

export const useArticleForm = () => {
  const t = useTranslations("ArticleForm");
  const { categories, categoryOptions } = useCategory();
  const router = useRouter();

  const { articles } = useArticle();
  const { showNotification } = useNotificationProvider();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArticleForm>();

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  const handleCreateArticle = async (form: ArticleForm) => {
    try {
      const response = await postArticleAction(form);
      if (response.isSuccess && response.data) {
        router.push(APP_ARTICLE_LIST_ARTICLE);
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Error creating article:", error);
      showNotification({
        type: "error",
        message: t("createArticleError"),
      });
    }
  };  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return {
    t,
    control,
    categories,
    categoryOptions,
    articles,
    register,
    handleSubmit,
    errors,
    goToCreateArticle,

    preview,
    setPreview,
    handleFileChange,
    handleCreateArticle,
  };
};
