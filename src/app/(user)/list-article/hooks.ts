import { useTranslations } from "next-intl";

export const useListArticle = () => {
  const t = useTranslations("listArticles");

  const listArticle = () => {
    return [
      { id: 1, title: "Article 1", content: "Content of Article 1" },
      { id: 2, title: "Article 2", content: "Content of Article 2" },
      { id: 3, title: "Article 3", content: "Content of Article 3" },
    ];
  };
  return {
    t,
    listArticle,
  };
};
