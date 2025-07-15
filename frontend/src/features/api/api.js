import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `/todos`,
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos`,
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ _id, ...body }) => ({
        url: `/todos/${_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation({
      query: ({ _id }) => ({
        url: `/todos/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
})

export const {
  /* naming convention is strict for creating this hook use CamelCase of crud method name followed by Query/Mutation*/
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = api

export default api