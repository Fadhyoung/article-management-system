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
import { debounce } from "lodash";

export const useArticles = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const router = useRouter();
  const { showNotification } = useNotificationProvider();
  const { pagination, articles, setFilter } =
    useArticle();

    const { control, handleSubmit, watch } = useForm<filterForm>();

  const handleDeleteArticle = async (id: string) => {
    try {
      const response = await deleteArticleAction(id);
      if (!response.isSuccess) {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      } else {
        setFilter({
          category: '',
          limit: 9,
          page: 1,
          search: ''
        })
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      showNotification({
        type: "error",
        message: t("deleteArticleError"),
      });
    }
  };

  const handleFilter = debounce(async (filters: { search: string; category: string }) => {
      setFilter({
        category: filters.category,
        search: filters.search,
        limit: pagination.dataPerPage,
        page: pagination.currentPage,
      })
      }, 300);

  const handlePageClick = async (page: number) => {
    setFilter({
      category: '',
      limit: pagination.dataPerPage,
      page: page,
      search: ''
    })
  };

  const handlePrevious = async () => {
    
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setFilter({
        category: '',
        limit: pagination.dataPerPage,
        page: newPage,
        search: ''
      })
    }
  };

  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;
      setFilter({
        category: '',
        limit: pagination.dataPerPage,
        page: newPage,
        search: ''
      })
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
    setFilter({
      category: '',
      limit: 9,
      page: 1,
      search: ''
    })
  }, [])

  return {
    pagination,    
    
    t,
    control,
    handleSubmit,
    handleFilter,
    watch,

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
