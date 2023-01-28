import { Box, Button, Group, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { AuthLayout } from 'src/layout';
// import { useLoginUserMutation } from 'src/reducks/auth';
import { z } from 'zod';

export type loginRequestBody = {
  email: string;
  password: string;
}
const loginInitalState:loginRequestBody = {
  email: "",
  password: "",
}

const schema = z
  .object({
    email: z
      .string()
      .email({ message: 'メールアドレスを正しく入力してください' }),
    password: z
      .string()
      .regex(/\w{8,}/, { message: '英数字8文字以上で入力してください' }),
  });

const LogIn: CustomNextPage = () => {
  // const [loginUser,{data, isSuccess,isError,error}] = useLoginUserMutation()
  const form = useForm({
    initialValues: loginInitalState,

    validate: zodResolver(schema),
  });
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <Title>Login</Title>
      <form
        onSubmit={form.onSubmit((values) => {
          return console.log(values);
        })}
      >

        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />



        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Text>
        すでにアカウントを持っている<Link href={"/sign-in"}>sign in画面へ</Link>
      </Text>
    </Box>
  );
};

LogIn.getLayout = AuthLayout;

export default LogIn;
