"use client";

import Typography from "@/components/Typography";
import { formatDate } from "@/utils/formatDate";
import { useDetailArticle } from "@/app/(user)/article/[id]/hooks";
import Image from "next/image";
import Link from "next/link";
import { truncateContent } from "@/utils/truncateText";
import Navbar from "@/app/(user)/components/Navbar";

export default function HomeComponent() {
  const { t, article, articles, loading } = useDetailArticle();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-5/6 mx-auto flex flex-col gap-1 items-center justify-center text-left">
      {/* NAVBAR */}
      <Navbar />

      {/* DETAIL ARTICLE */}
      <div className="mt-32 flex flex-col gap-4 items-center justify-center py-8">
        <Typography type="subtitle" variant="accent">
          {formatDate(article?.createdAt || "")}
        </Typography>
        <Typography type="display">{article?.title}</Typography>
      </div>

      <div className="w-full flex flex-col gap-10 items-center justify-center text-left">
        <Image
          src={article?.imageUrl || "/images/header_bg.jpeg"}
          alt="Article Image"
          height={200}
          width={100}
          className="w-full h-96 object-cover rounded-2xl"
          unoptimized
        />
        <Typography
          type="body"
          variant="accent"
          weight="300"
          className="w-full text-left"
        >
          {article?.content}
        </Typography>
      </div>

      {/* Other Articles */}
      <main className="w-full flex-grow bg-red py-8">
        <div className="">
          <div className="text-sm text-gray-500 mb-6">
            <Typography type="cardtitle">{t("otherArticles")}</Typography>
          </div>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-16">
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
                    {truncateContent(article.content, 10)}
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
        </div>
      </main>
    </div>
  );
}
