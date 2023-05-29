'use client';

import {
  isEmailValid,
  isPasswordValid,
  SetterFunction,
  Steps,
} from '~/utils/utils';
import { Session } from 'next-auth';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useApi } from './useApi';
import { API } from '~/utils/constants';
import { paths } from '~/utils/paths';

export type Steps = 'userKind' | 'signUp';

type UseAuthLayoutType = {
  email: string;
  emailError: string;
  name: string;
  nameError: string;
  setName: SetterFunction<string>;
  setNameError: SetterFunction<string>;
  handleSubmit: () => void;
  session: Session | null;
  password: string;
  passwordError: string;
  setEmail: SetterFunction<string>;
  setEmailError: SetterFunction<string>;
  setPassword: SetterFunction<string>;
  setPasswordError: SetterFunction<string>;
  isSignInValid: () => boolean;
};

const AuthLayoutContext = createContext<UseAuthLayoutType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const AuthLayoutProvider = ({
  children,
  session,
}: AuthProviderProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const { doPost } = useApi({ session });

  function isSignInValid() {
    setEmailError(!isEmailValid(email) ? 'Your email is invalid' : '');

    setPasswordError(
      !isPasswordValid(password) ? 'Your password is invalid.' : ''
    );

    return !!isEmailValid(email) && !!isPasswordValid(password);
  }

  function isValid() {
    setEmailError(!isEmailValid(email) ? 'Your email is invalid' : '');

    setPasswordError(
      !isPasswordValid(password) ? 'Your password is invalid.' : ''
    );

    return !!isEmailValid(email) && !!isPasswordValid(password);
  }

  const handleSubmit = () => {
    if (isValid()) {
      doPost({
        endpoint: API.signUp,
        withToken: false,
        body: JSON.stringify({
          user: {
            email,
            name,
            password,
          },
        }),
        callbacks: {
          success: () => {
            if (typeof window !== 'undefined')
              window.location.href = paths.home;
          },
        },
      });
    }
  };
  const value = {
    email,
    emailError,
    handleSubmit,
    session,
    password,
    passwordError,
    setEmail,
    setEmailError,
    name,
    setName,
    setNameError,
    nameError,
    setPassword,
    setPasswordError,
    isSignInValid,
  };

  return (
    <AuthLayoutContext.Provider value={value}>
      {children}
    </AuthLayoutContext.Provider>
  );
};

export const useAuthLayout = () => {
  const ctx = useContext(AuthLayoutContext);
  if (!ctx) {
    throw new Error('You are using Auth Layout out of context.');
  }
  return ctx;
};
