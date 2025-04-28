"use client";

import getArticleListAction from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { Pagination } from "@/types/Common";
import { createContext, useContext, useState } from "react";

interface ArticleState {
    article: Article | undefined;
    setArticle: (article: Article) => void;
    articles: Article[] | undefined;
    setArticles: (articles: Article[]) => void;

    pagination: Pagination;
    setPagination: (pagination: Pagination) => void;

    getArticles: () => void;
}

const articleContext = createContext<ArticleState>({
  article: undefined,
  setArticle: () => {},
  articles: undefined,
  setArticles: () => {},

  pagination: {
    currentPage: 1,
    totalData: 0,
    dataPerPage: 1,
  },
  setPagination: () => {},

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
    dataPerPage: 1,
  },)
  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const getArticles = async () => {
    try {
      const response = await getArticleListAction(1, 6);
      if (response.isSuccess) {
        setArticles(response.data.data);    
        setPagination({
          currentPage: response.data.currentPage,
          totalData: response.data.totalData,
          dataPerPage:  response.data.dataPerPage,
          totalPages: Math.ceil(response.data.totalData / response.data.dataPerPage),
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
      }}
    >
      {children}
    </articleContext.Provider>
  );
};
