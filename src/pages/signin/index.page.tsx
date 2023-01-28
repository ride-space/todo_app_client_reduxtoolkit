import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { AuthLayout } from 'src/layout';
import { authApi } from 'src/reducks/authStore';
import { useAppDispatch } from "src/reducks/store/hooks";
// import { useRegisterUserMutation } from 'src/reducks/authStore';
import { z } from 'zod';

export type signupRequestBody = {
  // confirmPassword: string;
  email: string;
  // firstName: string;
  // lastName: string;
  password: string;
};
const signupInitalState: signupRequestBody = {
  // confirmPassword: '',
  email: '',
  // firstName: '',
  // lastName: '',
  password: '',
};

const schema = z
  .object({
    // confirmPassword: z
    //   .string()
    //   .regex(/\w{8,}/, { message: '英数字8文字以上で入力してください' }),
    email: z
      .string()
      .email({ message: 'メールアドレスを正しく入力してください' }),
    // firstName: z.string().min(1, { message: '苗字を入力してください' }),
    // lastName: z.string().min(1, { message: '名前を入力してください' }),
    password: z
      .string()
      .regex(/\w{5,}/, { message: '英数字8文字以上で入力してください' }),
  })
  // .refine(
  //   (data) => {
  //     return data.password === data.confirmPassword;
  //   },
  //   {
  //     message: 'パスワードが一致しません',
  //     path: ['confirmPassword'], // path of error
  //   },
  // );

const SignIn: CustomNextPage = () => {
  // const { registerUser } = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: signupInitalState,
    validate: zodResolver(schema),
  });

  const handleSubmit = form.onSubmit(async(values) => {
    // const requestBody = {
    //   email:"user2@test.com",
    //   password:"user2"
    // }
    const data = await dispatch(authApi.endpoints.registerUser.initiate(values));
    console.log(data);
    // registerUser(values);
  });
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <Title>Sign up</Title>
      <form onSubmit={handleSubmit}>
        {/* <TextInput
          withAsterisk
          label="First Name"
          placeholder="John"
          mt="sm"
          {...form.getInputProps('firstName')}
        />
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Doe"
          mt="sm"
          {...form.getInputProps('lastName')}
        /> */}
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

        {/* <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps('confirmPassword')}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Text>
        すでにアカウントを持っている<Link href={'/log-in'}>login画面へ</Link>
      </Text>
    </Box>
  );
};

SignIn.getLayout = AuthLayout;

export default SignIn;
