"use client";

import getArticleListAction from "@/app/(user)/list-article/actions";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { createContext, useContext, useEffect, useState } from "react";

interface ArticleState {
    articles: Article[] | undefined;
    setArticles: (articles: Article[]) => void;
}

const articleContext = createContext<ArticleState>({
  articles: undefined,
  setArticles: () => {},
});

export const useArticle = () => useContext(articleContext);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const {showNotification} = useNotificationProvider();

  const [articles, setArticles] = useState<Article[] | undefined>(undefined);

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

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <articleContext.Provider
      value={{
        articles,
        setArticles,
      }}
    >
      {children}
    </articleContext.Provider>
  );
};
