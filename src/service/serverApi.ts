// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => {
    return {};
  },
  tagTypes: ['Todo','Todos'],
});
