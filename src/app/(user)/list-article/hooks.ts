"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { debounce } from "lodash";
import { useEffect } from "react";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const router = useRouter();

  const { pagination, setPagination, articles, setFilter } =
    useArticle();

  const { control, handleSubmit, watch } = useForm<filterForm>();

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
      search: '',
      limit: pagination.dataPerPage,
      page: page,
    })
  };

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setFilter({
        category: '',
        search: '',
        limit: pagination.dataPerPage,
        page: newPage,
      })
    }
  };
  
  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;
      setFilter({
        category: '',
        search: '',
        limit: pagination.dataPerPage,
        page: newPage,
      })
    }
  };
  
  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
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
    handleSubmit,
    handleFilter,
    watch,
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
