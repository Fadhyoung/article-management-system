"use client";

import Typography from "@/components/Typography";
import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useListArticle } from "@/app/(user)/list-article/hooks";
import CustomSelect from "@/components/Select";
import { Category } from "@/types/Category";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { debounce } from "lodash";
import { formatDate } from "@/utils/formatDate";

export default function HomeComponent() {
  const { t, control, categories, categoryOptions, articles } = useListArticle();

  const handleChangeCategory = (category: Category | undefined) => {
    console.log("User selected category:", category);
  };

  const handleSearch = debounce((search: string) => {
    console.log("User selected category:", search);
  }, 300);

  return (
    <>
      {/* Header with gradient background */}
      <header
        className="text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/header_bg.jpeg')",
        }}
      >
        <div className="px-4 py-12 flex flex-col gap-10 justify-center items-center bg-primary/85">
          {/* NAVBAR */}
          <div className="w-full px-40 my-10 flex justify-between items-center">
            <Image
              src={"/images/img_icon_white.png"}
              alt="logo"
              width={150}
              height={150}
              className="bg-transparent"
            />
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-1 mr-2">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm">James Clark</span>
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-5 justify-center items-center text-center mb-8">
            <Typography type="subtitle">{t("blogGenzet")}</Typography>
            <Typography type="display">{t("title")}</Typography>
            <Typography type="cardtitle" weight="300">
              {t("subTitle")}
            </Typography>
          </div>

          <div className="max-w-2xl mx-auto p-3 flex flex-col md:flex-row gap-4 justify-center items-center bg-secondary rounded-md">
            <div className="flex-1">
              <div className="space-y-2">
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

                        handleChangeCategory?.(selectedCategory);
                      }}
                      isError={!!fieldState.error}
                      errorText={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-96 bg-white rounded-md flex items-center px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <Controller
                  name="search"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      placeholder="Search articles..."
                      variant="primary"
                      size="sm"
                      radius="md"
                      isError={!!error}
                      errorText={error?.message}
                      className="w-96 bg-transparent text-gray-700 text-sm border-0 shadow-none focus:ring-0 focus:border-0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSearch(field.value);
                        }
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500 mb-6">
            Showing: <span className="font-medium">All 243 articles</span>
          </div>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg overflow-hidden"
              >
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
                  <div className="text-xs text-gray-500 mb-2">{formatDate(article.updatedAt)}</div>
                  <h3 className="font-bold text-lg mb-2">
                    <Link
                      href={"#"}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{article.content}</p>
                  <div className="flex flex-wrap gap-2">
                      <span
                        className='text-xs px-3 py-2 rounded-full bg-tertiary'
                      >
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
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-indigo-600 text-white">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}
