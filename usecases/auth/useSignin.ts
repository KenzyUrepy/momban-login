import { ParsedUrlQuery } from 'querystring';

import { FieldValue, useAuthRepository } from '../../repositories/AuthRepository';

export const useLogin = () => {
  const authRepository = useAuthRepository();

  const login = (fieldValue: FieldValue, query: ParsedUrlQuery): Promise<string> | Error => {
    try {
      return authRepository.login(fieldValue, query);
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
