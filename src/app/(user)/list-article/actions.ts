"use server";

import { CategoryResponse } from "@/types/Category";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";

export async function getCategoryAction(page? : number, limit?: number): Promise<
  CommonDataResponse<CategoryResponse>
> {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/categories`, {
        params: {
          page,
          limit,
        },
      }
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
        dataPerPage: response.data.totalPages,
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
