import axios from 'axios';
import { Callbacks, manageError, manageResponse } from '~/utils/utils';
import { Session } from 'next-auth';
import { useMemo, useCallback } from 'react';

type CallsProps = {
  endpoint: string;
  withToken?: boolean;
  body?: unknown;
  callbacks?: Callbacks;
  headers?: Record<string, string>;
};
type PostProps = CallsProps;
type PutProps = CallsProps;
type GetProps = Omit<CallsProps, 'body'>;
type DeleteProps = GetProps;
export type PostFn = <T>(props: PostProps) => Promise<T | undefined>;
export type PutFn = <T>(props: PutProps) => Promise<T | undefined>;
export type GetFn = <T>(props: GetProps) => Promise<T | undefined>;
export type DeleteFn = <T>(props: DeleteProps) => Promise<T | undefined>;

interface AuthProviderProps {
  session: Session | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://black-market-juan-rs.herokuapp.com';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ApiProvider = (param: AuthProviderProps) => {
  const setHeaders = useCallback(
    (withToken: boolean, headers?: Record<string, string>) => {
      return {
        headers: {
          ...(withToken && param.session
            ? {
                client: param.session.user?.client,
                uid: param.session.user?.uid,
                Authorization: `Bearer ${param.session.user?.accessToken}`,
                ...headers,
              }
            : {
                ...headers,
              }),
        },
      };
    },
    [param.session]
  );

  const doPost = useCallback(
    async function <T>({
      endpoint,
      body,
      callbacks,
      headers = {},
      withToken = true,
    }: PostProps) {
      try {
        const result = await instance
          .post(endpoint, body, setHeaders(withToken, headers))
          .then((response) => manageResponse(response, callbacks));

        return result as T;
      } catch (error) {
        manageError(error, callbacks);
      } finally {
        if (callbacks?.finally != null) callbacks.finally();
      }
    },
    [setHeaders]
  );

  const doPut = useCallback(
    async function <T>({
      endpoint,
      body,
      callbacks,
      headers = {},
      withToken = true,
    }: PutProps) {
      try {
        const result = await instance
          .put(endpoint, JSON.stringify(body), setHeaders(withToken, headers))
          .then((response) => manageResponse(response, callbacks));
        return result as T;
      } catch (error) {
        manageError(error, callbacks);
      } finally {
        if (callbacks?.finally != null) callbacks.finally();
      }
    },
    [setHeaders]
  );

  const doGet = useCallback(
    async function <T>({
      endpoint,
      callbacks,
      headers = {},
      withToken = true,
    }: GetProps) {
      try {
        const result = await instance
          .get<T>(endpoint, setHeaders(withToken, headers))
          .then((response) => manageResponse(response, callbacks));
        return result;
      } catch (error) {
        manageError(error, callbacks);
      } finally {
        if (callbacks?.finally != null) callbacks.finally();
      }
    },
    [setHeaders]
  );

  const doDelete = useCallback(
    async function <T>({
      endpoint,
      callbacks,
      headers = {},
      withToken = true,
    }: DeleteProps) {
      try {
        const result = await instance
          .delete(endpoint, setHeaders(withToken, headers))
          .then((response) => manageResponse(response, callbacks));
        return result as T;
      } catch (error) {
        manageError(error, callbacks);
      } finally {
        if (callbacks?.finally != null) callbacks.finally();
      }
    },
    [setHeaders]
  );

  return useMemo(
    () => ({ doPost, doPut, doGet, doDelete }),
    [doDelete, doGet, doPost, doPut]
  );
};

export const useApi = (props: AuthProviderProps) => ApiProvider(props);
