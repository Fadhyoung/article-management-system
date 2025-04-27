"use client";

import { useState } from "react";
import { Article } from "@/types/Articles";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCategory } from "@/app/(admin)/category/hooks";
import Typography from "@/components/Typography";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";

export default function CategoryPage() {
  const [search, setSearch] = useState("");

  const {
    t,
    control,
    handleSubmit,
    articles,
    status,
    openModal,
    isOpen,
    setIsOpen,
    handleWriteCategory,
    setId,
  } = useCategory();

  console.log("the articles is ", articles);

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
                {articles
                  ?.filter((article: Article) =>
                    article.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((article: Article, idx: number) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="py-3 px-4 border-y">
                        {article.category.name}
                      </td>
                      <td className="py-3 px-4 border-y">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="py-3 px-4  border-y">
                        <div className="flex gap-2 justify-center">
                          <Button
                            buttonType="ghost"
                            variant="primary"
                            className="underline hover:underline"
                            onClick={() => {
                              openModal("edit");
                              setId("s");
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            buttonType="ghost"
                            variant="danger"
                            className=" hover:underline"
                            onClick={() => openModal("delete")}
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
          <div className="p-6 flex justify-center mt-6 space-x-4">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Previous
            </button>
            <button className="px-4 py-2 border rounded bg-gray-200">1</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
              <div className="w-fit flex gap-5 self-end">
                <button
                  type="button"
                  className="border py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <Button
                  variant={status?.isDelete ? 'danger' : 'primary'}
                  radius="md"
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {status?.isAdd ? 'Add' : status?.isEdit ? 'Edit' : 'Delete'}
                </Button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
}
