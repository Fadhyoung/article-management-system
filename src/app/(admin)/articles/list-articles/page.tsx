"use client";

import Image from "next/image";
import { useState } from "react";
import { useArticles } from "@/app/(admin)/articles/list-articles/hooks";
import { Article } from "@/types/Articles";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";

export default function ArticlesPage() {
  const [search, setSearch] = useState("");

  const {
    pagination,

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
          <div className="p-6 flex items-center gap-4">
            <div>
              <select className="border rounded-lg p-2">
                <option>Category</option>
              </select>
            </div>
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
              onClick={goToCreateArticle}
            >
              + Add Articles
            </Button>
          </div>

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
                {articles
                  ?.filter((article: Article) =>
                    article.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((article: Article, idx: number) => (
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
