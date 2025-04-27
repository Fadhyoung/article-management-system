"use server";

import { Article as dummydata } from "@/constants/dummyDatas";
import { Article } from "@/types/Articles";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";

export default async function getDetailArticle(id: string): Promise<
  CommonDataResponse<Article>
> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`
    );

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
        data: dummydata,
      };
    }

    console.log("====================================")
    console.log("Response data:", response.data);

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
