"use client";

import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCategory } from "@/app/(admin)/category/hooks";
import Typography from "@/components/Typography";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { Category } from "@/types/Category";

export default function CategoryPage() {
  const [search, setSearch] = useState("");

  const {
    categories,

    t,
    control,
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
  } = useCategory();

  const { currentPage, totalPages } = pagination;

  console.log("the total page is: ", totalPages)

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="rounded-2xl shadow-md border bg-background2 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <div className="text-lg font-semibold">Total Articles: 20</div>
          </div>

          {/* Search & Filter */}
          <div className="p-6 flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 w-fit"
              />
            </div>
            <Button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              radius="md"
              onClick={() => openModal("add")}
            >
              + Add Articles
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead className="text-center bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-y">Category</th>
                  <th className="py-3 px-4 border-y">Created at</th>
                  <th className="py-3 px-4 border-y">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.data
                  ?.filter((category: Category) =>
                    category.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((category: Category, idx: number) => (
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
                            Edit
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
                            Delete
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
                        ? "bg-indigo-600 text-white"
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
                Next
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
                  Delete category “Technology”? This will remove it from master
                  data permanently.
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
                  Cancel
                </Button>
                <Button
                  variant={status?.isDelete ? "danger" : "primary"}
                  radius="md"
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {status?.isAdd ? "Add" : status?.isEdit ? "Edit" : "Delete"}
                </Button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
}
