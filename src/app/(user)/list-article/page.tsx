"use client";

import Typography from "@/components/Typography";
import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useListArticle } from "@/app/(user)/list-article/hooks";
import CustomSelect from "@/components/Select";
import { Category } from "@/types/Category";
import { Controller } from "react-hook-form";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  categories: string[];
  url: string;
}

export default function HomeComponent() {
  const { t, control, categories, categoryOptions } = useListArticle();

  const handleChangeCategory = (category: Category | undefined) => {
    console.log("User selected category:", category);
  };

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Cybersecurity Essentials Every Developer Should Know",
      excerpt:
        "Protect your apps and users with these fundamental cybersecurity practices for developers.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 24, 2023",
      categories: ["Development", "Security"],
      url: "#",
    },
    {
      id: "2",
      title: "The Future of Work: Remote-First Teams and Digital Tools",
      excerpt:
        "How tech companies are optimizing remote collaboration with digital tools and workflows.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 22, 2023",
      categories: ["Workplace", "Tools"],
      url: "#",
    },
    {
      id: "3",
      title: "Design Systems: Why Your Team Needs One in 2023",
      excerpt:
        "Learn how design systems save time, ensure consistency, and improve design efforts.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 21, 2023",
      categories: ["Design", "Productivity"],
      url: "#",
    },
    {
      id: "4",
      title: "Web3 and the Decentralized Internet: What You Need to Know",
      excerpt:
        "Understanding the basics of Web3 and how it could impact the future of websites.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 20, 2023",
      categories: ["Technology", "Web3"],
      url: "#",
    },
    {
      id: "5",
      title: "Debugging Like a Pro: Tools & Techniques for Faster Fixes",
      excerpt:
        "Streamline your debugging workflow with these tools for spotting issues quickly.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 19, 2023",
      categories: ["Development", "Tools"],
      url: "#",
    },
    {
      id: "6",
      title: "Accessibility in Design: More Than Just Compliance",
      excerpt:
        "Going beyond basic accessibility requirements to create experiences for everyone.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 18, 2023",
      categories: ["Design", "Accessibility"],
      url: "#",
    },
    {
      id: "7",
      title: "Agile vs Waterfall: A Game-Changer for Creative Development",
      excerpt:
        "How different project management approaches can impact the creative process.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 17, 2023",
      categories: ["Management", "Process"],
      url: "#",
    },
    {
      id: "8",
      title: "How AI Is Changing the Game in Front-End Design Work",
      excerpt:
        "The impact artificial intelligence is having on UI/UX design and front-end development.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 16, 2023",
      categories: ["Technology", "Design", "AI"],
      url: "#",
    },
    {
      id: "9",
      title: "UI/UX Trends Worth Watching in 2023",
      excerpt:
        "The most promising design trends to watch, and what's looking to be the next big thing.",
      image: "/placeholder.svg?height=200&width=300",
      date: "April 15, 2023",
      categories: ["Technology", "Design", "Trends"],
      url: "#",
    },
  ];

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

          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <div className="space-y-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomSelect
                      name="category"
                      options={categoryOptions}
                      value={field.value || ''}
                      onChange={(selectedValue) => {
                        const selectedCategory = categories?.data.find(
                          (category) => category.name === selectedValue
                        );

                        field.onChange(selectedCategory ?? null);

                        // Call your custom handler
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
              <div className="bg-white rounded-md flex items-center px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="bg-transparent outline-none text-gray-700 text-sm w-full"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <Link href={post.url} className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">{post.date}</div>
                  <h3 className="font-bold text-lg mb-2">
                    <Link
                      href={post.url}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          category === "Development"
                            ? "bg-red-100 text-red-600"
                            : category === "Security"
                            ? "bg-red-100 text-red-600"
                            : category === "Design"
                            ? "bg-purple-100 text-purple-600"
                            : category === "Technology"
                            ? "bg-blue-100 text-blue-600"
                            : category === "Workplace"
                            ? "bg-green-100 text-green-600"
                            : category === "Tools"
                            ? "bg-gray-100 text-gray-600"
                            : category === "Web3"
                            ? "bg-yellow-100 text-yellow-600"
                            : category === "Productivity"
                            ? "bg-green-100 text-green-600"
                            : category === "Accessibility"
                            ? "bg-orange-100 text-orange-600"
                            : category === "Management"
                            ? "bg-indigo-100 text-indigo-600"
                            : category === "Process"
                            ? "bg-indigo-100 text-indigo-600"
                            : category === "AI"
                            ? "bg-blue-100 text-blue-600"
                            : category === "Trends"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category}
                      </span>
                    ))}
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
