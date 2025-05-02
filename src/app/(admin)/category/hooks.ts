"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { Category, CategoryForm, FilterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { APP_ARTICLE_FORM } from "@/constants";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useState } from "react";
import { useModalProvider } from "@/providers/ModalProvider";
import postCategoryAction, {
  deleteCategoryAction,
  editCategoryAction,
} from "@/app/(admin)/category/actions";
import { getCategoryAction } from "@/app/(user)/list-article/actions";
import { debounce } from "lodash";

interface status {
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export const useCategory = () => {
  const t = useTranslations("ListCategories");
  const router = useRouter();

  const {
    pagination,
    setPagination,
    filter,
    setFilter,
    category,
    setCategory,
    categories,
    setCategories,
    categoryOptions,
    getCategory,
  } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const { isOpen, setIsOpen } = useModalProvider();

  
  const { control, handleSubmit, reset } = useForm<CategoryForm>();
  const {
    control: filterControl,
    handleSubmit: filterHandle,
    watch,
  } = useForm<FilterForm>();
  const [status, setStatus] = useState<status>();

  const handleWriteCategory = async (form: CategoryForm) => {
    try {
      let response;
      if (category && status?.isEdit) {
        response = await editCategoryAction(form, (category?.id ?? ''));
      } else if (status?.isAdd) {
        response = await postCategoryAction(form);
      } else {
        response = await deleteCategoryAction((category?.id ?? ''));
      }      
      if (response.isSuccess) {        
        showNotification({
          message: 'Request Success',
          mode: 'modal',
          type: 'success'
        })
        getCategory(filter);
        Math.ceil(pagination.totalData / 9);
        handleCloseModal();
      } else {
        showNotification({
          type: "error",
          mode: "modal",
          message: response.message,
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        message: (error as Error).message,
      });
    }
  };

  const openModal = (status: string, category?: Category) => {
    setIsOpen(true);
    setCategory(category);
    if (status == "add") {
      setStatus({ isAdd: true, isEdit: false, isDelete: false });
    } else if (status == "edit") {
      setStatus({ isAdd: false, isEdit: true, isDelete: false });
    } else {
      setStatus({ isAdd: false, isEdit: false, isDelete: true });
    }
  };

  const handleFilter = debounce(async (filters: FilterForm) => {
    if (!filters.search) {
      getCategory(filter);
    } else {
      const response = await getCategoryAction(1, pagination.totalData);

      const filteredCategories =
        response?.data.data.filter((category) =>
          category.name.toLowerCase().includes(filters.search!.toLowerCase())
        ) ?? [];

      console.log(filteredCategories);

      setPagination({
        dataPerPage: 9,
        totalPages: Math.ceil(pagination.totalData / 9),
        totalData: pagination.totalData,
        currentPage: 1,
      });

      setCategories({
        data: filteredCategories,
        dataPerPage: pagination.dataPerPage,
        totalPages: pagination.totalPages,
        currentPage: pagination.currentPage,
        totalData: pagination.totalData,
      });
    }
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

  const handleCloseModal = () => {
    setIsOpen(false);
    setStatus(undefined);
    setCategory(undefined);
    reset();
  };

  return {
    t,
    control,
    filterControl,
    filterHandle,
    watch,
    handleSubmit,
    categories,
    categoryOptions,

    // Modal State
    category,
    setCategory,
    isOpen,
    setIsOpen,
    status,
    openModal,

    goToCreateArticle,
    handleWriteCategory,
    handleCloseModal,

    pagination,
    handlePageClick,
    handleNext,
    handlePrevious,

    handleFilter,
  };
};
