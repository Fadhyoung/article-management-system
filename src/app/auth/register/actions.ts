"use server";

import { RegisterForm } from "@/types/Auth";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";
import { cookies } from "next/headers";
import { Profile } from "@/types/User";

export async function registerAction(
  registerRequest: RegisterForm
): Promise<CommonDataResponse< Profile | null>> {
  try {
    console.log('Login request:', registerRequest);

    const response = await axios.post(
      `${process.env.API_BASE_URL}/auth/register`,
      {
        username: registerRequest.username,
        password: registerRequest.password,
        role: registerRequest.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const registerResult = response;

    if (!registerResult) {
      return {
        data: null,
        message: 'Token not found in response',
        isSuccess: false,
      };
    }

    const loginResponse = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      {
        username: registerRequest.username,
        password: registerRequest.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const loginResult = loginResponse;

    if (!loginResult) {
      return {
        data: null,
        message: "Login after registration failed",
        isSuccess: false,
      };
    }

    const profileResponse = await axios.get(
      `${process.env.API_BASE_URL}/auth/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginResult.data.token}`,
        },
      }    
    );

    const cookieStore = await cookies();
    cookieStore.set("token", loginResult.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("user_role", loginResult.data.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return {
      isSuccess: true,
      message:  "Registration successful",
      data: profileResponse.data || null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
