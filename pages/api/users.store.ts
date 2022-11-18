import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const USERS_API_KEY = "usersApi";

export type TResponse = {
  data?: any;
  error?: {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
  };
};

export const usersApi = createApi({
  reducerPath: USERS_API_KEY,
  refetchOnFocus: false,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers, { getState }) => {
      const rootState = getState() as RootState;
      return headers;
    },
  }),
  tagTypes: ["users"],
  endpoints: (build) => ({
    getClients: build.query<any, void>({
      query: (params) => ({
        url: `/users`,
      }),
      providesTags: ["users"],
      transformResponse: (response: TResponse) => response.data,
    }),
  }),
});

export const { useGetClientsQuery } = usersApi;

export interface AuthState {
  users: [] | null;
}

const initialState: AuthState = {
  users: null,
};

export const USERS_SLICE = "users";

export const userSlice = createSlice({
  name: USERS_SLICE,
  initialState,
  reducers: {
    saveStateArticles(state) {
      state.users = state.users || [];
    },
  },
});

export const selectArticles = (state: RootState): AuthState => state.users;

// createStories: build.mutation<GetStoryDto, FormData>({
//     query: (story) => ({
//         url: '',
//         method: 'POST',
//         body: story,
//     }),
//     invalidatesTags: ['stories'],
//     transformResponse: (response: TResponse) => response?.data,
// }),
// fetchOneStory: build.query<GetStoryDto, string>({
//     query: (storyId) => ({
//         url: `by/${storyId}`,
//     }),
//     providesTags: (result) => ['stories'],
//     transformResponse: (response: TResponse) => response?.data,
// }),
// updateStory: build.mutation<
//     GetStoryDto,
//     { storyId: string; payload: FormData }
// >({
//     query: ({ storyId, payload }) => ({
//         url: `${storyId}`,
//         method: 'PUT',
//         body: payload,
//     }),
//     invalidatesTags: () => ['stories'],
//     transformResponse: (response: TResponse) => response?.data,
// }),
// deleteStory: build.mutation<void, string>({
//     query: (id) => ({
//         url: `${id}`,
//         method: 'DELETE',
//     }),
//     invalidatesTags: () => ['stories'],
//     transformResponse: (response: TResponse) => response?.data,
// }),
