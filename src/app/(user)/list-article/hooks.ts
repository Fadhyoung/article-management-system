"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { useEffect } from "react";
import getArticleListAction from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const router = useRouter();

  const { pagination, setPagination, articles, getArticles, setArticles } =
    useArticle();

  const { control } = useForm<filterForm>();

  const handlePageClick = async (page: number) => {
    try {
      // Call the action with the updated page number and the current items per page (pagination.dataPerPage)
      const response = await getArticleListAction(page, pagination.dataPerPage);

      if (response.isSuccess) {
        // Update the state with the new articles and pagination info
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: page,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ), // Calculate total pages
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
  
      // Call the action to fetch articles for the previous page
      const response = await getArticleListAction(newPage, pagination.dataPerPage);
  
      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / pagination.dataPerPage),
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
  
      // Call the action to fetch articles for the next page
      const response = await getArticleListAction(newPage, pagination.dataPerPage);
  
      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / pagination.dataPerPage),
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
  

  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  useEffect(() => {
    getArticles();
  }, []);

  console.log("pagination ", pagination);

  return {
    pagination,
    setPagination,
    t,
    router,
    control,
    categories,
    categoryOptions,
    articles,
    goToDetailArticle,
    handlePageClick,
    handleNext,
    handlePrevious,
  };
};
