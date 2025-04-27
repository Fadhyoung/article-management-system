"use client";

import Typography from "@/components/Typography";
import { formatDate } from "@/utils/formatDate";
import { useDetailArticle } from "@/app/(user)/article/[id]/hooks";
import Image from "next/image";

export default function HomeComponent() {
  const { article } = useDetailArticle();

  return (
    <>
      {/* DETAIL ARTICLE */}
      <div className="flex flex-col gap-10 items-center justify-center py-8">
        <Typography type="subtitle" variant="accent">{formatDate(article?.createdAt || "")}</Typography>
        <Typography type="display">{article?.title}</Typography>
      </div>

      <div className="w-full flex flex-col gap-10 items-center justify-center py-8 text-left">
        <Image 
          src={article?.imageUrl || "/images/header_bg.jpeg"}
          alt="Article Image"
          height={200}
          width={100}
          className="w-full h-96 object-cover rounded-2xl"
        />
        <Typography type="body" variant="accent" weight="300" className="w-full text-left">
          {article?.content}
        </Typography>
      </div>

      {/* BOTTOM CONTENTS */}
      <main className="flex-grow bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500 mb-6">
            Showing: <span className="font-medium">All 243 articles</span>
          </div>

        </div>
      </main>
    </>
  );
}
