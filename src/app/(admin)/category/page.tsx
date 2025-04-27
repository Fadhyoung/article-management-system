"use client";

import { useState } from "react";
import { useArticles } from "@/app/(admin)/articles/list-articles/hooks";
import { Article } from "@/types/Articles";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";

export default function CategoryPage() {
  const [search, setSearch] = useState("");

  const { articles, goToCreateArticle, handleDeleteArticle } = useArticles();

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
              onClick={goToCreateArticle}
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
    </>
  );
}
