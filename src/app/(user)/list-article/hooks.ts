"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { FilterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { debounce } from "lodash";
import { useEffect } from "react";
import getArticleListAction from "@/actions/article";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions, setFilter: getCategories } = useCategoryProvider();
  const router = useRouter();

  const { pagination, setPagination, articles, setArticles, setFilter } =
    useArticle();

  const { control, handleSubmit, watch } = useForm<FilterForm>();

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
      category: "",
      search: "",
      limit: pagination.dataPerPage,
      page: page,
    });
  };

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setFilter({
        category: "",
        search: "",
        limit: pagination.dataPerPage,
        page: newPage,
      });
    }
  };

  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;
      setFilter({
        category: "",
        search: "",
        limit: pagination.dataPerPage,
        page: newPage,
      });
    }
  };

  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  useEffect(() => {
    setFilter({
      category: "",
      limit: 9,
      page: 1,
      search: "",
    });
    getCategories({
      page: 1,
      limit: 20,
    })
  }, []);

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
