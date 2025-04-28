"use server";

import { RegisterForm } from "@/types/Auth";
import { CommonDataResponse } from "@/types/Common";
import axios from "axios";

export async function registerAction(
  registerRequest: RegisterForm
): Promise<CommonDataResponse<{ access_token: string } | null>> {
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

    const result = response;


    if (!result) {
      return {
        data: null,
        message: 'Token not found in response',
        isSuccess: false,
      };
    }

    return {
      isSuccess: true,
      message:  "Registration successful",
      data: result.data || null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Server error: ", error);
    }
    throw error;
  }
}
