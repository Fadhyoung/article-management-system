"use client";

import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCategory } from "@/app/(admin)/category/hooks";
import Typography from "@/components/Typography";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { Category } from "@/types/Category";
import { Search } from "lucide-react";

export default function CategoryPage() {
  const {
    categories,

    t,
    control,
    watch,
    filterControl,
    filterHandle,
    handleSubmit,
    status,
    openModal,
    isOpen,
    handleWriteCategory,
    setId,
    handleCloseModal,

    handlePrevious,
    handleNext,
    handlePageClick,
    pagination,

    handleFilter,
  } = useCategory();

  const { currentPage, totalPages } = pagination;

  console.log(categories)

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="rounded-2xl shadow-md border bg-background2 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <div className="text-lg font-semibold">
              {t("totalCategories")} {pagination.totalData}
            </div>
          </div>

          {/* Search & Filter */}
          <div className="p-6 flex items-center gap-4">
            <form
              onSubmit={filterHandle(handleFilter)}
              className="w-full flex gap-4 justify-between"
            >
              <div className="w-full md:w-96 bg-white rounded-md flex items-center px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <Controller
                  name="search"
                  control={filterControl}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Search articles..."
                      variant="primary"
                      size="sm"
                      radius="md"
                      isError={!!error}
                      errorText={error?.message}
                      className="bg-transparent text-gray-700 text-sm border-0 shadow-none focus:ring-0 focus:border-0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleFilter({
                            search: field.value || "",
                            category: watch("category") || "",
                          });
                        }
                      }}
                    />
                  )}
                />
              </div>
            </form>

            <Button
              radius="md"
              onClick={() => openModal("add")}
            >
              {t("addCategory")}
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead className="text-center bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-y">{t("tableCategory")}</th>
                  <th className="py-3 px-4 border-y">{t("tableCreatedAt")}</th>
                  <th className="py-3 px-4 border-y">{t("tableAction")}</th>
                </tr>
              </thead>
              <tbody>
                {categories?.data.map((category: Category, idx: number) => (
                  <tr key={idx} className="text-center hover:bg-gray-50">
                    <td className="py-3 px-4 border-y">{category.name}</td>
                    <td className="py-3 px-4 border-y">
                      {formatDate(category.updatedAt)}
                    </td>
                    <td className="py-3 px-4  border-y">
                      <div className="flex gap-2 justify-center">
                        <Button
                          buttonType="ghost"
                          variant="primary"
                          className="underline hover:underline"
                          onClick={() => {
                            openModal("edit");
                            setId(category.id);
                          }}
                        >
                          {t("edit")}
                        </Button>
                        <Button
                          buttonType="ghost"
                          variant="danger"
                          className=" hover:underline"
                          onClick={() => {
                            openModal("delete");
                            setId(category.id);
                          }}
                        >
                          {t("delete")}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center m-10">
            <nav className="flex items-center gap-1">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages ?? 0 }, (_, i) => i + 1).map(
                (page: number) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                      page === pagination.currentPage
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("next")}
              </button>
            </nav>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        body={
          <>
            <form
              onSubmit={handleSubmit(handleWriteCategory)}
              className="flex flex-col gap-5"
            >
              <Typography type="subtitle">
                {status?.isAdd
                  ? "Add Category"
                  : status?.isEdit
                  ? "Edit Category"
                  : "Delete Category"}
              </Typography>

              {status?.isDelete ? (
                <Typography type="caption" variant="accent">
                  {t("modalDesc")}
                </Typography>
              ) : (
                <div>
                  <Controller
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: t("nameRequired"),
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label={t("name")}
                        placeholder={t("namePlaceholder")}
                        isError={!!fieldState.error}
                        errorText={fieldState.error?.message}
                        variant="primary"
                        size="md"
                        radius="md"
                        required
                      />
                    )}
                  />
                </div>
              )}

              <div className="w-fit flex gap-5 self-end">
                <Button
                  type="button"
                  variant="secondary"
                  buttonType="outline"
                  radius="md"
                  className="border py-2 px-4 rounded-lg hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant={status?.isDelete ? "danger" : "primary"}
                  radius="md"
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {status?.isAdd
                    ? t("add")
                    : status?.isEdit
                    ? t("edit")
                    : t("delete")}
                </Button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
}
