"use client";

import Image from "next/image";
import { useArticles } from "@/app/(admin)/articles/list-articles/hooks";
import { Article } from "@/types/Articles";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";
import { Search } from "lucide-react";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import CustomSelect from "@/components/Select";

export default function ArticlesPage() {
  const {
    pagination,

    handleFilter,
    control,
    handleSubmit,
    watch,

    categories,
    categoryOptions,

    articles,
    goToCreateArticle,
    goToDetailArticle,
    handleDeleteArticle,
    goToEditArticle,

    handlePageClick,
    handleNext,
    handlePrevious,
  } = useArticles();

  const { currentPage, totalPages } = pagination;

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="rounded-2xl shadow-md border bg-background2 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <div className="text-lg font-semibold">Total Articles: 20</div>
          </div>

          {/* Search & Filter */}
          <form
            onSubmit={handleSubmit(handleFilter)}
            className="w-full p-6 flex gap-4 justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="flex-1 w-full">
                <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomSelect
                      name="category"
                      options={categoryOptions}
                      value={field.value || ""}
                      onChange={(selectedValue) => {
                        const selectedCategory = categories?.data.find(
                          (category) => category.name === selectedValue
                        );
                        field.onChange(selectedCategory ?? null);

                        handleFilter({
                          search: watch("search") || "",
                          category: selectedCategory?.name || "",
                        });
                      }}
                      isError={!!fieldState.error}
                      errorText={fieldState.error?.message}
                      className="w-full md:w-fit bg-white text-gray-700 text-sm border-0 shadow-none focus:ring-0 focus:border-0"
                    />
                  )}
                />
              </div>
              <div className="w-full md:w-96 bg-white rounded-md flex items-center px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <Controller
                  name="search"
                  control={control}
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
            </div>
            <Button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              radius="md"
              onClick={goToCreateArticle}
            >
              + Add Articles
            </Button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-y">Thumbnails</th>
                  <th className="py-3 px-4 border-y">Title</th>
                  <th className="py-3 px-4 border-y">Category</th>
                  <th className="py-3 px-4 border-y">Created at</th>
                  <th className="py-3 px-4 border-y">Action</th>
                </tr>
              </thead>
              <tbody>
                {articles?.map((article: Article, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-y">
                      <Image
                        src={article?.imageUrl || "/images/placeholder.jpeg"}
                        alt="thumbnail"
                        width={10}
                        height={10}
                        className="w-14 h-14 object-cover rounded"
                        unoptimized={true}
                      />
                    </td>
                    <td className="py-3 px-4 border-y">{article.title}</td>
                    <td className="py-3 px-4 border-y">
                      {article.category.name}
                    </td>
                    <td className="py-3 px-4 border-y">
                      {formatDate(article.createdAt)}
                    </td>
                    <td className="py-3 px-4  border-y">
                      <div className="flex gap-2">
                        <Button
                          buttonType="ghost"
                          variant="primary"
                          className="underline hover:underline"
                          onClick={() => goToDetailArticle(article.id)}
                        >
                          Preview
                        </Button>
                        <Button
                          buttonType="ghost"
                          variant="primary"
                          className="underline hover:underline"
                          onClick={() => goToEditArticle(article.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          buttonType="ghost"
                          variant="danger"
                          className=" hover:underline"
                          onClick={() => handleDeleteArticle(article.id)}
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
    </>
  );
}
