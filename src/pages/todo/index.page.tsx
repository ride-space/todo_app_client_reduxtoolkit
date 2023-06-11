import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  usePostTodoMutation,
  usePutTodoMutation,
} from 'src/service/todoApi';
import { z } from 'zod';

const createSchema = z.object({
  todo: z.string(),
  userId: z.string(),
});
const updateSchema = z.object({
  todo: z.string(),
  todoId: z.string(),
  userId: z.string(),
});

const Todo = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [cursorId, setCursorId] = useState<string| undefined>();
  const { data, isError, isLoading } = useGetTodosQuery({
    cursor: cursorId || "",
  });
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [deleteTodo] = useDeleteTodoMutation();
  const [postTodo] = usePostTodoMutation();
  const [putTodo] = usePutTodoMutation();

  const loadMore = useCallback(() => {
    setCursorId(data?.pagination.endCursor?.toString()as string);
    setHasNextPage(data?.pagination.hasNextPage as boolean);
  },[data?.pagination.endCursor, data?.pagination.hasNextPage]);
  const [sentryRef] = useInfiniteScroll({
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: isError,
    hasNextPage,
    loading: isLoading,
    onLoadMore: loadMore,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  const createForm = useForm({
    initialValues: {
      todo: '',
      userId: '1',
    },
    validate: zodResolver(createSchema),
  });

  const CreateSubmit = createForm.onSubmit(async (values) => {
    await postTodo(values)
      .unwrap()
      .then(() => {
        createForm.reset();
        // return console.log(d.id);
      });
  });

  const editForm = useForm({
    initialValues: {
      todo: '',
      todoId: '',
      userId: '1',
    },
    validate: zodResolver(updateSchema),
  });
  console.log(data);

  // const UpdateSubmit = editForm.onSubmit(async (values) => {
  //   console.log(values)
  //   await putTodo(values)
  //     .unwrap()
  //     .then((d) => {
  //       setIsEdit(false);
  //       editForm.reset();
  //       return console.log(d.id);
  //     });
  // });

  return (
    <div style={{ padding: '20px 20px 32px' }}>
      <Box>
        {isEdit ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(editForm.values);
              await putTodo(editForm.values)
                .unwrap()
                .then((d) => {
                  setIsEdit(false);
                  editForm.reset();
                  return console.log(d.id);
                });
            }}
          >
            <TextInput
              withAsterisk
              label="todo"
              placeholder="todo"
              {...editForm.getInputProps('todo')}
            />
            <Button type="submit">Submit</Button>
          </form>
        ) : (
          <form onSubmit={CreateSubmit}>
            <TextInput
              withAsterisk
              label="todo"
              placeholder="todo"
              {...createForm.getInputProps('todo')}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Box>

      <Stack mt={10}>
        {data?.data.map((todo) => {
          return (
            <Flex
              align="center"
              gap={12}
              key={todo.id}
              sx={{ border: '1px solid #000', padding: '10px' }}
            >
              <Title>{todo.id}</Title>
              <Link href={`/todo/${todo.id}`}>
                <Title>{todo.todo}</Title>
              </Link>
              <Group position="right">
                <Button
                  onClick={() => {
                    editForm.setValues({
                      todo: todo.todo,
                      todoId: todo.id,
                    });
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="red"
                  onClick={async () => {
                    await deleteTodo(todo.id);
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Flex>
          );
        })}
        {(isLoading || data?.pagination.hasNextPage) && (
          <Center ref={sentryRef}>
            <Loader />
          </Center>
        )}
      </Stack>
    </div>
  );
};

export default Todo;
