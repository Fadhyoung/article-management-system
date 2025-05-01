"use client";

import { Controller } from "react-hook-form";
import { Suspense, useState } from "react";
import { ArrowLeft, ImageUp, X } from "lucide-react";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Input from "@/components/Input";
import { useArticleForm } from "@/app/(admin)/articles/form/hooks";
import CustomSelect from "@/components/Select";
import Image from "next/image";
import Link from "next/link";
import { APP_CATEGORY } from "@/constants";
import { useSearchParams } from "next/navigation";
import { Article } from "@/types/Articles";

function ArticleFormContent() {
  const [wordCount, setWordCount] = useState(0);
  const params = useSearchParams();
  const id = params.get("id");
  const {
    t,
    preview,
    setPreview,
    categories,
    categoryOptions,
    register,
    handleSubmit,
    control,
    router,
    errors,
    handleFileChange,
    handleWriteArticle,
    goToPreviewPage,
  } = useArticleForm(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen p-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleWriteArticle)}
          className="space-y-6 p-6 rounded-lg shadow-md border bg-background2"
        >
          {/* IMAGE UPLOAD */}
          <div className="flex items-center mb-6">
            <Button
              buttonType="ghost"
              variant="secondary"
              className="flex text-sm text-gray-600 mr-4"
              onClick={() => router.back()}
            >
              <ArrowLeft />
              <Typography type="cardtitle" className="ml-2">
                {t("createArticle")}
              </Typography>
            </Button>
          </div>
          <div>
            <label className="block mb-2 font-medium text-black">{t("thumbnails")}</label>
            {!preview ? (
              <div className="w-fit border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("thumbnail")}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <ImageUp className="text-gray-400" />
                  <Typography
                    type="caption"
                    variant="muted"
                    className="cursor-pointer underline hover:underline mt-2"
                  >
                    {t("selectFile")}
                  </Typography>
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  {t("supportedFile")}
                </p>
              </div>
            ) : (
              <div className="relative w-48 h-48">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  onClick={() => setPreview(null)}
                >
                  <X />
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <Controller
              name="title"
              defaultValue=""
              control={control}
              rules={{
                required: t("titleRequired"),
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label={t("title")}
                  placeholder={t("titlePlaceholder")}
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

          {/* Category */}
          <div className="flex-1 w-full">
            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Category"
                  name="categoryId"
                  required
                  options={categoryOptions}
                  value={field.value || ""}
                  onChange={(selectedValue) => {
                    const selectedCategory = categories?.data.find(
                      (category) => category.name === selectedValue
                    );
                    field.onChange(selectedCategory?.id ?? null);
                  }}
                  isError={!!fieldState.error}
                  errorText={fieldState.error?.message}
                  className="w-full bg-white text-gray-700 text-sm shadow-none focus:ring-0"
                />
              )}
            />
            <div className="py-1 flex gap-2">
              <Typography type="body" variant="accent">
                {t("categoryCaption")}
              </Typography>
              <Link href={APP_CATEGORY} className="text-primary">
                {t("menu")}
              </Link>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block mb-2 font-medium text-black">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={10}
              placeholder="Type a content..."
              className="w-full border p-2 rounded-lg bg-white"
              onChange={(e) => {
                const content = e.target.value;
                setWordCount(
                  content.trim().split(/\s+/).filter(Boolean).length
                );
              }}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
            <div className="text-right text-sm text-gray-500">
              {wordCount} Words
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              buttonType="outline"
              variant="secondary"
              radius="lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              buttonType="outline"
              variant="secondary"
              radius="lg"
              onClick={handleSubmit((values) => {
                const selectedCategory = categories?.data.find(
                  (category) => category.id === values.categoryId
                );

                const previewData: Article = {
                  id: "preview-id",
                  userId: "user-123",
                  categoryId: values.categoryId,
                  title: values.title,
                  content: values.content,
                  imageUrl: null,
                  createdAt: "2025-04-26T05:00:41.444Z",
                  updatedAt: "2025-04-26T05:00:41.444Z",
                  category: {
                    id: selectedCategory?.id ?? "cat-001",
                    userId: selectedCategory?.userId ?? "user-123",
                    name: selectedCategory?.name ?? "Uncategorized",
                    createdAt:
                      selectedCategory?.createdAt ?? "2025-04-26T05:00:41.444Z",
                    updatedAt:
                      selectedCategory?.updatedAt ?? "2025-04-26T05:00:41.444Z",
                  },
                  user: {
                    id: "user-123",
                    username: "John Doe",
                  },
                };

                goToPreviewPage(previewData);
              })}
            >
              Preview
            </Button>

            <Button variant="primary" type="submit" size="lg" radius="lg">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </Suspense>
  );
}

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleFormContent />
    </Suspense>
  );
}
