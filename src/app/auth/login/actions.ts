"use server";

import { cookies } from "next/headers";
import { LoginForm } from "@/types/Auth";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";
import { Profile } from "@/types/User";

export async function loginAction(
  loginRequest: LoginForm
): Promise<CommonDataResponse<Profile | null>> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        username: loginRequest.username,
        password: loginRequest.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response;

    if (!result) {
      return {
        data: null,
        message: "Token not found in response",
        isSuccess: false,
      };
    }

    try {
      const response_get_profile = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data.token}`,
          },
        }
      );

      const cookieStore = await cookies();
      cookieStore.set("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      cookieStore.set("user_role", result.data.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      return {
        isSuccess: true,
        message: "Login successful",
        data: response_get_profile.data || null,
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log("Server error: ", error);
      }
      throw error;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
