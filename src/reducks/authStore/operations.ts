import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { loginRequestBody } from 'src/pages/login/index.page';
import type { signupRequestBody } from 'src/pages/signin/index.page';
import type { responseCsrf, responseMessage } from 'src/reducks/authStore/type';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// axiosのheaderをセットするサンプル
// https://qiita.com/hibohiboo/items/544c641c9c0a981eb31b

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<
  {
    data?: AxiosRequestConfig['data'];
    method: AxiosRequestConfig['method'];
    params?: AxiosRequestConfig['params'];
    url: string;
  },
  unknown,
  unknown
> => {
  return async ({ data, method, params, url }) => {
    try {
      const result = await axios({ data, method, params, url: baseUrl + url });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          data: err.response?.data || err.message,
          status: err.response?.status,
        },
      };
    }
  };
};

export const authApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => {
    return {
      getCsrf: builder.mutation<responseCsrf, null>({
        query: () => {
          return {
            method: 'GET',
            url: '/auth/csrf',
          };
        },
      }),
      loginUser: builder.mutation<responseMessage, loginRequestBody>({
        query: (body) => {
          return {
            body,
            method: 'POST',
            url: '/auth/login',
          };
        },
      }),
      registerUser: builder.mutation<responseMessage, signupRequestBody>({
        query: (body) => {
          return {
            body,
            method: 'POST',
            url: '/auth/signup',
          };
        },
      }),
    };
  },
  reducerPath: 'auth',
});

export const {
  useGetCsrfMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApi;
