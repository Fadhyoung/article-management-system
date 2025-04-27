import Typography from "@/components/Typography";
import { APP_ARTICLE_LIST_ARTICLE, APP_CATEGORY } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col gap-10 p-6">
        <Image src={"/images/img_icon_white.png"} alt="logo" width={150} height={150} />
        <nav className="flex flex-col gap-4">
          <Link href={APP_ARTICLE_LIST_ARTICLE} className="bg-blue-600 py-2 px-4 rounded-lg">
            Articles
          </Link>
          <Link href={APP_CATEGORY} className="hover:bg-blue-600 py-2 px-4 rounded-lg">
            Category
          </Link>
          <Link href="#" className="hover:bg-blue-600 py-2 px-4 rounded-lg">
            Logout
          </Link>
        </nav>
      </aside>
      <div className="w-full">
        <header className="w-full py-4 px-10 flex items-center justify-between border bg-background2">
            <Typography type="cardtitle">Articles</Typography>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <span className="font-medium">James Dean</span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
