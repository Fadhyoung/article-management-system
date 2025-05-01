"use client";

import Typography from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { useListArticle } from "@/app/(user)/list-article/hooks";
import CustomSelect from "@/components/Select";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { formatDate } from "@/utils/formatDate";
import { truncateContent } from "@/utils/truncateText";
import Navbar from "@/app/(user)/components/Navbar";
import { Search } from "lucide-react";

export default function HomeComponent() {
  const {
    handleSubmit,
    handleFilter,
    watch,
    pagination,
    handleNext,
    handlePrevious,
    t,
    control,
    categories,
    categoryOptions,
    articles,
    handlePageClick,
  } = useListArticle();

  const { currentPage, totalPages } = pagination;

  return (
    <>
      <header
        className="bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/header_bg.jpeg')",
        }}
      >
        <div className="px-4 py-12 flex flex-col gap-10 justify-center items-center bg-primary/85">
          {/* NAVBAR */}
          <Navbar
            className="!bg-transparent !border-0 !text-white"
            imageUrl="/images/img_icon_white.png"
          />

          <div className="mt-20 w-full md:w-1/2 flex flex-col gap-5 justify-center items-center text-center mb-8">
            <Typography variant="white" type="subtitle">
              {t("blogGenzet")}
            </Typography>
            <Typography variant="white" type="display">
              {t("title")}
            </Typography>
            <Typography variant="white" type="cardtitle" weight="300">
              {t("subTitle")}
            </Typography>
          </div>

          <form
            className="max-w-2xl mx-auto p-3 flex flex-col md:flex-row gap-4 justify-center items-center bg-secondary rounded-md"
            onSubmit={handleSubmit(handleFilter)}
          >
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
                      field.onChange(selectedCategory?.name ?? null);

                      handleFilter({
                        search: watch("search") || "",
                        category: selectedCategory?.name || "",
                      });
                    }}
                    isError={!!fieldState.error}
                    errorText={fieldState.error?.message}
                    className="w-full md:!w-40 bg-white text-gray-700 text-sm border-0 shadow-none focus:ring-0 focus:border-0"
                  />
                )}
              />
            </div>
            <div className="flex-1">
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
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow bg-white py-8">
        <div className="w-full md:w-5/6 mx-auto px-4 space-y-5">
          <Typography type="body">
            Showing:{" "}
            <span className="font-medium">
              {" "}
              {pagination.totalData} articles
            </span>
          </Typography>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {articles?.map((article) => (
              <article key={article.id} className="rounded-lg overflow-hidden">
                <Link href={`/article/${article.id}`} className="block">
                  <div className="relative h-48 border rounded-2xl overflow-hidden">
                    <Image
                      src={article.imageUrl || "/images/header_bg.jpeg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">
                    {formatDate(article.updatedAt)}
                  </div>
                  <Typography type="cardtitle">
                    <Link
                      href={"#"}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </Typography>
                  <p className="text-sm text-gray-600 mb-3">
                    {truncateContent(article.content, 15)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-2 rounded-full text-black bg-tertiary">
                      {article.category.name}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-1">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("previous")}
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
                {t("next")}
              </button>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}
