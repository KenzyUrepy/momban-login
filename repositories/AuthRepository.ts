import { ParsedUrlQuery } from 'querystring';

export type FieldValue = {
  email: string;
  password: string;
};

export const useAuthRepository = () => {
  const login = async (loginFieldValue: FieldValue, query: ParsedUrlQuery): Promise<string> => {
    const res = await fetch(
      `${process.env.MOMBAN_API_URL}/connect/signin?callback_uri=${query.callback_uri}&response_type=${query.response_type}&client_id=${query.client_idD}&scope=${query.scope}`,
      {
        body: JSON.stringify(loginFieldValue),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    if (!res.ok) {
      return 'IDまたはパスワードが異なります';
    }
    return await res.text();
  };
  const signup = async (registerFieldValue: FieldValue, query: ParsedUrlQuery): Promise<string> => {
    const res = await fetch(
      `${process.env.MOMBAN_API_URL}/connect/signup?response_type=${query.response_type}&client_id=${query.client_idD}&scope=${query.scope}`,
      {
        body: JSON.stringify({ ...registerFieldValue }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    return await res.text();
  };
  return {
    login,
    signup,
  };
};
