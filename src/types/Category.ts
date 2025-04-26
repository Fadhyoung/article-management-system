export interface Category {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  data: Category[];
  totalPages: number;
  currentPage: number;
  totalData: number;
}

export interface filterForm {
  name: string;
  page: number;
  limit: number;
}
