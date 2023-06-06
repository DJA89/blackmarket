import type { Dispatch, SetStateAction } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

export type SetterFunction<T> = Dispatch<SetStateAction<T>>;
export type UserKindType = 'brand' | 'creator' | '';
export type Callbacks<T = any> = {
  success?: (value?: T) => void;
  error?: (value?: string) => void;
  finally?: () => void;
};

export const isPasswordValid = (value: string) => {
  const passwordRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
  );
  return passwordRegex.test(value);
};

export const isEmailValid = (value: string) => {
  if (value.length > 50) return false;
  const emailRegex = /^.+@.+$/;

  return emailRegex.test(value);
};

export const manageResponse = (
  response: AxiosResponse<any>,
  callbacks?: Callbacks
) => {
  if (response.status >= 200 && response.status < 400) {
    if (callbacks?.success != null)
      callbacks.success(response.data ?? response);
  } else {
    throw Error(response.data);
  }
  return response.data;
};

export const manageError = (error: any, callbacks?: Callbacks) => {
  const { response } = error as AxiosError<any>;

  if (response?.status === 500) console.error('to do: error!');
  else if (callbacks?.error) {
    if (response?.data.error) {
      callbacks?.error(response.data);
    }
    if (response?.data.message && response?.data?.message[0]?.length > 1)
      callbacks.error(response?.data?.message[0] ?? String(error));
    else callbacks.error(response?.data?.message ?? String(error));
  } else throw error;
};
