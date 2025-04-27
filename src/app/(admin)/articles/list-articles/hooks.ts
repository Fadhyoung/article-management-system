"use client";

import { useTranslations } from "next-intl";
import { useCategory } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { APP_ARTICLE_FORM, APP_ARTICLE_LIST_ARTICLE } from "@/constants";
import deleteArticleAction from "@/app/(admin)/articles/list-articles/actions";
import { useNotificationProvider } from "@/providers/NotificationProvider";

export const useArticles = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategory();
  const router = useRouter();
  const { showNotification } = useNotificationProvider();
  const { articles } = useArticle();

  const { control } = useForm<filterForm>();

  const handleDeleteArticle = async (id: string) => {
    try {
      const response = await deleteArticleAction(id);
      if (response.isSuccess) {
        router.push(APP_ARTICLE_LIST_ARTICLE);
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      showNotification({
        type: "error",
        message: t("deleteArticleError"),
      });
    }
  };

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  return {
    t,
    control,
    categories,
    categoryOptions,
    articles,
    goToCreateArticle,
    handleDeleteArticle,
  };
};
