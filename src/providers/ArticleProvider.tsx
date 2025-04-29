"use client";

import getArticleListAction from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { FilterForm } from "@/types/Category";
import { Pagination } from "@/types/Common";
import { createContext, useContext, useEffect, useState } from "react";

interface ArticleState {
    article: Article | undefined;
    setArticle: (article: Article) => void;
    articles: Article[] | undefined;
    setArticles: (articles: Article[]) => void;

    pagination: Pagination;
    setPagination: (pagination: Pagination) => void;

    filter: FilterForm | undefined;
    setFilter: (filter: FilterForm) => void;

    getArticles: (filter: FilterForm | undefined) => void;
}

const articleContext = createContext<ArticleState>({
  article: undefined,
  setArticle: () => {},
  articles: undefined,
  setArticles: () => {},

  pagination: {
    currentPage: 1,
    totalData: 0,
    dataPerPage: 9,
  },
  setPagination: () => {},

  filter: undefined,
  setFilter: () => {},

  getArticles: () => {},
});

export const useArticle = () => useContext(articleContext);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const {showNotification} = useNotificationProvider();

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalData: 0,
    dataPerPage: 9,
  },)
  const [filter, setFilter] = useState<FilterForm | undefined>({
    category: '',
    search: '',
    limit: pagination.dataPerPage,
    page: pagination.currentPage
  });
  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const getArticles = async (filters: FilterForm | undefined) => {
    try {
      const response = await getArticleListAction(filters?.page, filters?.limit, filters?.search, filters?.category);
      if (response.isSuccess) {
        setArticles(response.data.data);    
        setPagination({
          currentPage: response.data.currentPage,
          totalData: response.data.totalData,
          dataPerPage:  response.data.dataPerPage,
          totalPages: Math.ceil(response.data.totalData / (response.data.dataPerPage || 9)),
        })          
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
    getArticles(filter);
  }, [filter]);

  return (
    <articleContext.Provider
      value={{
        pagination,
        setPagination,
        article,
        setArticle,
        articles,
        setArticles,
        getArticles,

        filter,
        setFilter
      }}
    >
      {children}
    </articleContext.Provider>
  );
};
