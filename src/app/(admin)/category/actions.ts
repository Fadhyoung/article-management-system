'use server';

import { CategoryForm } from "@/types/Category";
import { CommonResponse } from "@/types/Common";
import axios from "axios";
import { cookies } from "next/headers";

export default async function postCategoryAction(form: CategoryForm): Promise<
  CommonResponse
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
      {
        name: form.name,
      },
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

export async function editCategoryAction(form: CategoryForm, id: string): Promise<
  CommonResponse
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
      {
        name: form.name,
      },
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

export async function deleteCategoryAction(id: string): Promise<
  CommonResponse
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
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

