'use server';

import { CommonResponse } from "@/types/Common";
import axios from "axios";
import { cookies } from "next/headers";

export default async function deleteArticleAction(id: string): Promise<
  CommonResponse
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("============================================================================")
      console.log("Response status:", response.data);

    if (response.status !== 200) {
      console.error("Response status:", response.statusText);
      return {
        isSuccess: true,
        message: "Get category successful",
      };
    }

    return {
      isSuccess: true,
      message: "Get category successful",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
