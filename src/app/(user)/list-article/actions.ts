"use server";

import { articles } from "@/constants/dummyDatas";
import { ArticleResponse } from "@/types/Articles";
import { CategoryResponse } from "@/types/Category";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";

export default async function getArticleListAction(): Promise<
  CommonDataResponse<ArticleResponse>
> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`
    );

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
        data: {
          data: articles.data,
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalData: response.data.totalData,
        },
      };
    }

    return {
      isSuccess: true,
      message: "Get category successful",
      data: {
        data: response.data.data,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        totalData: response.data.totalData,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}

export async function getCategoryAction(): Promise<
  CommonDataResponse<CategoryResponse>
> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
    );

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      throw new Error("Failed to Get category");
    }

    return {
      isSuccess: true,
      message: "Get category successful",
      data: {
        data: response.data.data,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        totalData: response.data.totalData,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
