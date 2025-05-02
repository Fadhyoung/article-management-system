"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { FilterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { APP_ARTICLE, APP_ARTICLE_FORM } from "@/constants";
import deleteArticleAction from "@/app/(admin)/articles/list-articles/actions";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useEffect } from "react";
import { debounce } from "lodash";
import getArticleListAction from "@/actions/article";
import { useModalProvider } from "@/providers/ModalProvider";
import { Article } from "@/types/Articles";

export const useArticles = () => {
  const t = useTranslations("ListArticles");
  const router = useRouter();

  const { categories, categoryOptions } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const { pagination, setPagination, article, setArticle, articles, setArticles, setFilter } = useArticle();
  const { isOpen, setIsOpen } = useModalProvider();

  const { control, handleSubmit, watch } = useForm<FilterForm>();

  const handleOpenDeleteModal = (article: Article) => {
    setArticle(article);
    setIsOpen(true);
  }

  const handleDeleteArticle = async () => {
    try {
      const response = await deleteArticleAction(article?.id ?? '');
      setIsOpen(false);
      if (!response.isSuccess) {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      } else {
        showNotification({
          type: "success",
          mode: "modal",
          message: 'Article deleted',
        });
        setFilter({
          category: "",
          limit: 9,
          page: 1,
          search: "",
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        message: (error as Error).message,
      });
    }
  };

  const handleFilter = debounce(async (filters: FilterForm) => {
  
      const response = await getArticleListAction(
        1,
        pagination.totalData,
        filters.search
      );
  
      const filteredArticleByCategory =
        response?.data.data.filter((article) =>
          article.category.name
            .toLowerCase()
            .includes(filters.category!.toLowerCase())
        ) ?? [];
  
      setPagination({
        dataPerPage: 9,
        totalPages: Math.ceil(filteredArticleByCategory.length / 9),
        totalData: filteredArticleByCategory.length,
        currentPage: 1,
      });
  
      setArticles(filteredArticleByCategory);
    }, 300);

  const handlePageClick = async (page: number) => {
    setFilter({
      limit: pagination.dataPerPage,
      page: page,
    });
  };

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setFilter({
        limit: pagination.dataPerPage,
        page: newPage,
      });
    }
  };

  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;
      setFilter({
        limit: pagination.dataPerPage,
        page: newPage,
      });
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
      limit: 9,
      page: 1,
    });
  }, []);

  return {
    pagination,

    t,
    control,
    handleSubmit,
    handleFilter,
    watch,

    // Modal State
    article,
    isOpen,
    setIsOpen,

    categories,
    categoryOptions,
    articles,
    goToCreateArticle,
    handleOpenDeleteModal,
    handleDeleteArticle,
    goToDetailArticle,
    goToEditArticle,

    handlePageClick,
    handlePrevious,
    handleNext,
  };
};
