"use server";

import { cookies } from "next/headers";
import { CommonDataResponse } from "@/types/Common";

export async function logoutAction(): Promise<CommonDataResponse<null>> {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("token");

    return {
      isSuccess: true,
      message: "Logout successful",
      data: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error during logout: ", error);
    }
    return {
      isSuccess: false,
      message: "Error during logout",
      data: null,
    };
  }
}
