"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { CategoryForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { APP_ARTICLE_FORM, APP_CATEGORY } from "@/constants";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useState } from "react";
import { useModalProvider } from "@/providers/ModalProvider";
import postCategoryAction, {
  deleteCategoryAction,
  editCategoryAction,
} from "@/app/(admin)/category/actions";
import { getCategoryAction } from "@/app/(user)/list-article/actions";

interface status {
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export const useCategory = () => {
  const t = useTranslations("ListCategory");
  const router = useRouter();

  const { pagination, setPagination, categories, categoryOptions, setCategories, getCategory } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const { isOpen, setIsOpen } = useModalProvider();

  const { control, handleSubmit, reset } = useForm<CategoryForm>();
  const [status, setStatus] = useState<status>();
  const [id, setId] = useState<string>("");

  const handleWriteCategory = async (form: CategoryForm) => {
    try {
      let response;
      if (id && status?.isEdit) {
        response = await editCategoryAction(form, id);
      } else if (status?.isAdd) {
        response = await postCategoryAction(form);
      } else {
        response = await deleteCategoryAction(id);
      }
      if (response.isSuccess) {
        getCategory();
        handleCloseModal();
        router.push(APP_CATEGORY);
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
        message: (error as Error).message,
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

  const handlePageClick = async (page: number) => {
    try {
      const response = await getCategoryAction(page);

      if (response.isSuccess) {
        setCategories(response.data);
        setPagination({
          ...pagination,
          currentPage: page,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
        });
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

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      const response = await getCategoryAction(
        newPage,
        pagination.dataPerPage
      );

      if (response.isSuccess) {
        setCategories(response.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };

  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;

      const response = await getCategoryAction(
        newPage,
        pagination.dataPerPage
      );

      if (response.isSuccess) {
        setCategories(response.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };

  const goToCreateArticle = () => {
    router.push(APP_ARTICLE_FORM);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setStatus(undefined);
    setId("");
    reset();
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
    handleCloseModal,

    pagination,
    handlePageClick,
    handleNext,
    handlePrevious,
  };
};
