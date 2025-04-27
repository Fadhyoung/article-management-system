import { Category } from "@/types/Category";
import { Pagination } from "@/types/Common";
import { User } from "@/types/User";

export interface Article {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
}

export interface ArticleResponse extends Pagination {
  data: Article[];
}

export interface ArticleForm {
  title: string;
  content: string;
  categoryId: string;
  thumbnail: FileList;
}
