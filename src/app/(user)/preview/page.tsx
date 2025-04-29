"use client";

import Typography from "@/components/Typography";
import { formatDate } from "@/utils/formatDate";
import { useArticle } from "@/providers/ArticleProvider";
import Image from "next/image";
import Navbar from "@/app/(user)/components/Navbar";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function HomeComponent() {
  const {  article } = useArticle();
  const router = useRouter();

  return (
    <div className="w-5/6 mx-auto h-full flex flex-col gap-1 items-center justify-center text-left">

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

      <Button buttonType="solid" variant="primary" radius="lg" size="lg" onClick={() => router.back() }> back</Button>

    </div>
  );
}
