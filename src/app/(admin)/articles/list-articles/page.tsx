"use client";

import Image from "next/image";
import { useState } from "react";
import { useArticles } from "@/app/(admin)/articles/list-articles/hooks";
import { Article } from "@/types/Articles";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/Button";

export default function ArticlesPage() {
  const [search, setSearch] = useState("");

  const {articles, goToCreateArticle } = useArticles();

  console.log("the articles is ", articles);

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="rounded-2xl shadow-md border bg-background2 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <div className="text-lg font-semibold">
              Total Articles: 20
            </div>
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
            <Button className="bg-blue-600 text-white py-2 px-4 rounded-lg" radius="md" onClick={goToCreateArticle}>
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
                {articles?.filter((article: Article) =>
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
                      <td className="py-3 px-4 border-y">{article.category.name}</td>
                      <td className="py-3 px-4 border-y">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="py-3 px-4 border-y space-x-2">
                        <Button className="text-primary underline hover:underline">
                          Preview
                        </Button>
                        <Button className="text-primary underline hover:underline">
                          Edit
                        </Button>
                        <Button className="text-red-600 hover:underline">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
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
