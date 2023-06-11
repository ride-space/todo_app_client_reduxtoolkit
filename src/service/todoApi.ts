import { serverApi } from 'src/service/serverApi';

export type Mas = {
  message: string;
};

export type PaginationResponse ={
  endCursor:number;
  hasNextPage:boolean;
}

export type Todo = {
  id: string;
  todo: string;
  userId: string;
};

export type TodoRequest = {
  data: Todo[];
  pagination:PaginationResponse
};
const todoApi = serverApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteTodo: builder.mutation<Mas, string>({
        // invalidatesTags: ['Todo'],
        async onQueryStarted(
          arg,
          {
            dispatch,
            // queryFulfilled
          }
          ) {
          try {
            // const { data: updatedPost } = await queryFulfilled
            dispatch(
              todoApi.util.updateQueryData('getTodos', {}, (draft) => {
                const removeTodo= draft.data.filter((todo)=> {
                 return arg !== todo.id
                })
                draft.data = removeTodo
                // Object.assign(draft, updatedPost)
              })
            )
          } catch {}
        },
        query: (id) => {
          return {
            method: 'delete',
            url: `todo/${id}`,
          };
        },
      }),
      getTodo: builder.query<Todo, string>({
        // providesTags: ['Todos'],
        query: (id) => {
          return {
            method: 'get',
            url: `todo/${id}`,
          };
        },
      }),
      getTodos: builder.query<TodoRequest, {cursor?: string,limit?: string }>({

        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.cursor !== previousArg?.cursor
        },
        merge: (currentCache, newItems) => {
          currentCache.data= currentCache.data.concat(newItems.data)
          currentCache.pagination.endCursor = newItems.pagination.endCursor
          currentCache.pagination.hasNextPage = newItems.pagination.hasNextPage

        },
        // providesTags: ['Todo'],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                providesTags: (result, error, arg) =>
        {return result
          ? [...result.data.map(({ id }) => {return { id, type: 'Todo' as const }}), 'Todo']
          : ['Todo']},
        query: (params) => {
          return {
            method: 'get',
            params,
            url: `todo`,
          };
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
      postTodo: builder.mutation<Todo, {todo: string, userId:string }>({
        invalidatesTags: ['Todo'],
        query: (todo) => {
          return {
            body: todo,
            method: 'post',
            url: `todo`,
          };
        },
      }),
      putTodo: builder.mutation<
        Todo,
        { todo: string; todoId: string; userId: string }
      >({
        // invalidatesTags: ['Todo'],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        invalidatesTags: (result, error, arg) => {return [{ id: result?.id, type: 'Todo' }]},
        query: (item) => {
          return {
            body: { todo: item.todo, userId: item.userId },
            method: 'put',
            url: `todo/${item.todoId}`,
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const { useDeleteTodoMutation,useGetTodoQuery,useGetTodosQuery,usePostTodoMutation,usePutTodoMutation } = todoApi;
