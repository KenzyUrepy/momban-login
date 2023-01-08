import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSignup } from '../usecases/auth/useSignup';

type FormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const href =
    typeof window !== 'undefined' ? `https://${window.location.hostname}:3001` : 'Invalid URI';
  const router = useRouter();
  const query = router.query;
  const { signup } = useSignup();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const res = await signup(values, query);

    if (res instanceof Error) return;
    router.push(res);
  };

  return (
    <>
      <Flex
        alignItems="center"
        bgColor="blackAlpha.900"
        justifyContent="center"
        minH="calc(100dvh)"
        minW="calc(100dvw)"
      >
        <Box bgColor="whiteAlpha.900" borderRadius="8px" minW="360px">
          <Text align="center" fontSize="2xl" mt="16px">
            アカウント登録
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={!!errors.email || !!errors.password}
              mb="16px"
              px="32px"
              py="16px"
            >
              <Box>
                <FormLabel fontSize="medium">メールアドレス</FormLabel>
                <Input
                  id="email"
                  placeholder="example@momban.net"
                  type="email"
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                  })}
                />
                {!!errors.email && (
                  <FormErrorMessage color="red">{String(errors.email.message)}</FormErrorMessage>
                )}
              </Box>
              <Box mt="16px">
                <FormLabel fontSize="medium">パスワード</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
                {!!errors.password && (
                  <FormErrorMessage color="red">{String(errors.password.message)}</FormErrorMessage>
                )}
              </Box>
              <Link
                href={`/?response_type=${query.response_type}&client_id=${query.client_id}&scope=${query.scope}`}
              >
                <Text fontSize="2xs" mt="8px">
                  アカウントをお持ちの方はこちら
                </Text>
              </Link>
              <Center mt="32px">
                <Button color="white" colorScheme="blue" type="submit" w="full">
                  アカウント登録
                </Button>
              </Center>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
}
