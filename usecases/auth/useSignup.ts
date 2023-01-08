import { ParsedUrlQuery } from 'querystring';

import { FieldValue, useAuthRepository } from '../../repositories/AuthRepository';

export const useSignup = () => {
  const authRepository = useAuthRepository();

  const signup = (fieldValue: FieldValue, query: ParsedUrlQuery): Promise<string> | Error => {
    try {
      return authRepository.signup(fieldValue, query);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      } else {
        throw new Error('Something to wrong :(');
      }
    }
  };

  return {
    signup,
  };
};
