export interface CommonResponse {
  status?: string;
  isSuccess?: boolean;
  message: string;
}

export interface CommonDataResponse<T> extends CommonResponse {
  data: T;
}

export interface Pagination {
  totalPages: number;
  currentPage: number;
  totalData: number;
}

export interface CommonPaginatedDataResponse<T>
  extends CommonResponse,
    Pagination {
  data: T[];
}
