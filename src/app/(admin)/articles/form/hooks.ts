"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { APP_ARTICLE_FORM, APP_ARTICLE_LIST_ARTICLE } from "@/constants";
import { ArticleForm } from "@/types/Articles";
import { useEffect, useState } from "react";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import postArticleAction from "@/app/(admin)/articles/form/actions";
import { getDetailArticle } from "@/actions/article";

export const useArticleForm = () => {
  const t = useTranslations("ArticleForm");
  const { categories, categoryOptions } = useCategoryProvider();
  const router = useRouter();

  const { article, setArticle } = useArticle();
  const { showNotification } = useNotificationProvider();
  const [preview, setPreview] = useState<string | null>(null);

  const params = useSearchParams();
  const id = params.get("id");

  const {
    register,
    reset,
    handleSubmit,
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
          console.log("Fetched articles:", response);
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

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [])

  useEffect(() => {    
    if (id && article && categoryOptions != null) {
      const selectedCategory = categoryOptions.find(
        (option) => option.label === article.category.name
      );
      console.log(selectedCategory?.label);
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
