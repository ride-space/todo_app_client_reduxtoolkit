import { Box, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useGetTodoQuery } from 'src/service/todoApi';

const TodoById = () => {
  const router = useRouter();
  const { data } = useGetTodoQuery(router.query.id as string);

  return (
  <Box p={20}>
    <Title>詳細</Title>
    <Text fz={32} mt={8}>{data?.todo}</Text>
    </Box>
    );
};

export default TodoById;
