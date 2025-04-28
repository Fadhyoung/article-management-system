'use server'

import { Article as dummyData } from "@/constants/dummyDatas";
import { Article, ArticleForm } from "@/types/Articles";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";
import { cookies } from "next/headers";


export default async function postArticleAction(form: ArticleForm): Promise<
  CommonDataResponse<Article>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.post(
        `${process.env.API_BASE_URL}/articles`,
        {
          title: form.title,
          content: form.content,
          categoryId: form.categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (response.status !== 200) {
      return {
        isSuccess: true,
        message: "Get category successful",
        data: response.data.data
      };
    }

    return {
      isSuccess: true,
      message: "Get category successful",
      data: response.data.data
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}

export async function putArticleAction(form: ArticleForm, id: string): Promise<
  CommonDataResponse<Article>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.put(
        `${process.env.API_BASE_URL}/articles/${id}`,
        {
          title: form.title,
          content: form.content,
          categoryId: form.categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
        data: dummyData
      };
    }

    return {
      isSuccess: true,
      message: "Get category successful",
      data: response.data.data
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
