import { serverApi } from 'src/service/serverApi';

export type Mas = {
  message: string;
};

export type Todo = {
  id: string;
  todo: string;
  userId: string;
};

export type TodoRequest = {
  data: Todo[];
};
const jsonTestApi = serverApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteTodo: builder.mutation<Mas, string>({
        query: (id) => {
          return {
            method: 'delete',
            url: `todo/${id}`,
          };
        },
      }),
      getTodo: builder.query<Todo, string>({
        query: (id) => {
          return {
            method: 'get',
            url: `todo/${id}`,
          };
        },
      }),
      getTodos: builder.query<TodoRequest, void>({
        query: () => {
          return {
            method: 'get',
            url: `todo`,
          };
        },
      }),
      postTodo: builder.mutation<Todo, {todo: string, userId:string }>({
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

export const { useDeleteTodoMutation,useGetTodoQuery,useGetTodosQuery,usePostTodoMutation,usePutTodoMutation } = jsonTestApi;
