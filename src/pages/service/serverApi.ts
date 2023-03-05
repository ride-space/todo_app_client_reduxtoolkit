// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export type PostType = {
  id: number;
  body: string;
  title: string;
  userId: number;
};
// Define a service using a base URL and expected endpoints
export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => {return {}},
})


