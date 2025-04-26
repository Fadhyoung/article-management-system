'use server';

import { cookies } from 'next/headers';
import { LoginForm } from '@/types/Auth';
import { CommonDataResponse } from '@/types/Common';
import axios from 'axios';

export async function loginAction(
  loginRequest: LoginForm
): Promise<CommonDataResponse<{ access_token: string } | null>> {
  console.log('Login request:', loginRequest);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        username: loginRequest.username,
        password: loginRequest.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response;
    console.log('=================================================')
    console.log('Login result:', result);

    if (!result) {
      return {
        data: null,
        message: 'Token not found in response',
        isSuccess: false,
      };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return {
      isSuccess: true,
      message: 'Login successful',
      data: result.data || null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Server error: ', error);
    }
    throw error;
  }
}