'use server';

import { articles, Article as dummydata  } from "@/constants/dummyDatas";
import { Article, ArticleResponse } from "@/types/Articles";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";

export default async function getArticleListAction(page?: number, limit?:number, title?: string, category?: string): Promise<
  CommonDataResponse<ArticleResponse>
> {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/articles`,{
        params: {
          page,
          limit,
          title,
          category,
        },
      }
    );

    console.log('====================================================');
    console.log(response.data);

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
        data: {
          data: articles.data,
          dataPerPage: response.data.totalPages,
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
        dataPerPage: response.data.limit,
        currentPage: response.data.page,
        totalData: response.data.total,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}

export async function getDetailArticle(id: string): Promise<
  CommonDataResponse<Article>
> {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/articles/${id}`
    );

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
        data: dummydata,
      };
    }

    return {
      isSuccess: true,
      message: "Get category successful",
      data: response.data,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
