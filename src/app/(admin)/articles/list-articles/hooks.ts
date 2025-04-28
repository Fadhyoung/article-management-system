"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { APP_ARTICLE, APP_ARTICLE_FORM } from "@/constants";
import deleteArticleAction from "@/app/(admin)/articles/list-articles/actions";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useEffect } from "react";
import getArticleListAction from "@/actions/article";

export const useArticles = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const router = useRouter();
  const { showNotification } = useNotificationProvider();
  const { pagination, setPagination, setArticles, articles, getArticles } =
    useArticle();

  const { control } = useForm<filterForm>();

  const handleDeleteArticle = async (id: string) => {
    console.log("the id is ", id);
    try {
      const response = await deleteArticleAction(id);
      if (response.isSuccess) {
        getArticles();
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

  const handlePageClick = async (page: number) => {
    try {
      const response = await getArticleListAction(page, pagination.dataPerPage);

      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: page,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
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

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      const response = await getArticleListAction(
        newPage,
        pagination.dataPerPage
      );

      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };

  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;

      const response = await getArticleListAction(
        newPage,
        pagination.dataPerPage
      );

      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  const goToDetailArticle = (id: string) => {
    router.push(`${APP_ARTICLE}${id}`);
  };

  const goToEditArticle = (id: string) => {
    router.push(`${APP_ARTICLE_FORM}?id=${id}`);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return {
    pagination,
    
    t,
    control,
    categories,
    categoryOptions,
    articles,
    goToCreateArticle,
    handleDeleteArticle,
    goToDetailArticle,
    goToEditArticle,

    handlePageClick,
    handlePrevious,
    handleNext,
  };
};
