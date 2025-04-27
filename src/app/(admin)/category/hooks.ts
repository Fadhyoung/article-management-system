"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { CategoryForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { APP_ARTICLE_FORM, APP_ARTICLE_LIST_ARTICLE } from "@/constants";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useState } from "react";
import { useModalProvider } from "@/providers/ModalProvider";
import postCategoryAction, { editCategoryAction } from "@/app/(admin)/category/actions";

interface status {
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export const useCategory = () => {
  const t = useTranslations("ListCategory");
  const router = useRouter();

  const { categories, categoryOptions } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const { isOpen, setIsOpen } = useModalProvider();

  const { control, handleSubmit } = useForm<CategoryForm>();
  const [status, setStatus] = useState<status>();
  const [id, setId] = useState<string>('');

  const handleWriteCategory = async (form: CategoryForm) => {
    try {
      let response;
      if (id) {
        response = await editCategoryAction(form, id);
      } else {
        response = await postCategoryAction(form);
      }
      if (response.isSuccess) {
        router.push(APP_ARTICLE_LIST_ARTICLE);
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Error creating article:", error);
      showNotification({
        type: "error",
        message: t("createArticleError"),
      });
    }
  };

  const openModal = (status: string) => {
    setIsOpen(true);
    if (status == "add") {
      setStatus({ isAdd: true, isEdit: false, isDelete: false });
    } else if (status == "edit") {
      setStatus({ isAdd: false, isEdit: true, isDelete: false });
    } else {
      setStatus({ isAdd: false, isEdit: false, isDelete: true });
    }
  };

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  return {
    t,
    control,
    handleSubmit,
    categories,
    categoryOptions,

    isOpen,
    setIsOpen,
    status,
    openModal,
    setId,

    goToCreateArticle,
    handleWriteCategory,
  };
};
