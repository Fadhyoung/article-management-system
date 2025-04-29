"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import {
  APP_ARTICLE_FORM,
  APP_ARTICLE_LIST_ARTICLE,
  APP_PREVIEW,
} from "@/constants";
import { Article, ArticleForm } from "@/types/Articles";
import { useEffect, useState } from "react";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import postArticleAction, {
  putArticleAction,
} from "@/app/(admin)/articles/form/actions";
import { getDetailArticle } from "@/actions/article";

export const useArticleForm = (id: string | null) => {
  const t = useTranslations("ArticleForm");
  const router = useRouter();

  const { categories, categoryOptions } = useCategoryProvider();
  const { article, setArticle } = useArticle();
  const { showNotification } = useNotificationProvider();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<ArticleForm>();

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  const getArticle = async (id: string) => {
    try {
      const response = await getDetailArticle(id);
      if (response.isSuccess) {
        setArticle(response.data);
        showNotification({
          type: "success",
          message: t("getArticleSuccess"),
          mode: "toast",
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        message: (error as Error).message,
        mode: "toast",
      });
    }
  };

  const goToPreviewPage = (article: Article) => {
    setArticle(article);
    router.push(APP_PREVIEW);
  };

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
    if (article) {
      reset({
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
      });
    }
  }, []);

  useEffect(() => {
    if (id && article && categoryOptions != null) {
      const selectedCategory = categoryOptions.find(
        (option) => option.label === article.category.name
      );
      reset({
        title: article.title || "",
        categoryId: selectedCategory?.label ?? undefined,
        content: article.content || "",
        thumbnail: undefined,
      });
      if (article.imageUrl) {
        setPreview(article.imageUrl);
      }
    }
  }, [id, article, reset]);

  const handleWriteArticle = async (form: ArticleForm) => {
    try {
      let response;
      if (id) {
        response = await putArticleAction(form, id);
      } else {
        response = await postArticleAction(form);
      }
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
      showNotification({
        type: "error",
        message: (error as Error).message,
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
    getValues,
    categories,
    categoryOptions,
    register,
    handleSubmit,
    errors,
    goToCreateArticle,
    goToPreviewPage,
    router,

    preview,
    setPreview,
    handleFileChange,
    handleWriteArticle,
  };
};
