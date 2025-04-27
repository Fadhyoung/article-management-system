"use client";

import getArticleListAction from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { createContext, useContext, useState } from "react";

interface ArticleState {
    article: Article | undefined;
    setArticle: (article: Article) => void;
    articles: Article[] | undefined;
    setArticles: (articles: Article[]) => void;

    getArticles: () => void;
}

const articleContext = createContext<ArticleState>({
  article: undefined,
  setArticle: () => {},
  articles: undefined,
  setArticles: () => {},

  getArticles: () => {},
});

export const useArticle = () => useContext(articleContext);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const {showNotification} = useNotificationProvider();

  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const getArticles = async () => {
    try {
      const response = await getArticleListAction();
      if (response.isSuccess) {
        setArticles(response.data.data);              
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
