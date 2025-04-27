import { Pagination } from "@/types/Common";

export interface Category {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse extends Pagination {
  data: Category[];
}

export interface filterForm {
  category: string;
  page: number;
  limit: number;
  search: string;
}
