import { ParsedUrlQuery } from 'querystring';

import { loginFieldValue, useAuthRepository } from '../../repositories/AuthRepository';

export const useLogin = () => {
  const authRepository = useAuthRepository();

  const login = (
    fieldValue: loginFieldValue,
    referer: string,
    query: ParsedUrlQuery,
  ): Promise<string> | Error => {
    try {
      return authRepository.login(fieldValue, referer, query);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      } else {
        throw new Error('Something to wrong :(');
      }
    }
  };

  return {
    login,
  };
};
