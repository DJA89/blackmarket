'use client';

import { signIn } from 'next-auth/react';
import BMLink from '~/components/BMLink';
import logo from '~/../public/Title.png';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Image from 'next/image';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { paths } from '~/utils/paths';

export default function SignIn() {
  const {
    isSignInValid,
    email,
    setEmail,
    emailError,
    password,
    passwordError,
    setPassword,
  } = useAuthLayout();

  const handleSignIn = () => {
    console.log('Inside handleSignIn');

    console.log(
      '🚀 ~ file: sign_in.tsx:27 ~ handleSignIn ~ isSignInValid:',
      isSignInValid()
    );
    if (isSignInValid()) {
      console.log("I'ma enter either way");
      signIn('credentials', {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: paths.home,
      });
    }
  };

  return (
    <>
      <section className="mb-5 ml-30 mt-16 flex h-106 w-89 flex-col items-center justify-between rounded-lg bg-white p-9">
        <h1 className="mt-3">
          <Image src={logo} alt="Black Market" />
        </h1>
        <Input
          errorMessage={emailError}
          handleChange={({ target: { value } }) => setEmail(value)}
          label="Email"
          name="email"
          placeholder="Type your email"
          type="email"
          value={email}
        />
        <Input
          errorMessage={passwordError}
          handleChange={({ target: { value } }) => setPassword(value)}
          hideButton={true}
          label="Password"
          name="password"
          placeholder="Type your password"
          type="password"
          value={password}
        />
        <Button text="Log in" handleClick={handleSignIn} />
        <BMLink url="" text="I forgot my password" />
      </section>
      <section className="ml-30 flex h-32 w-89 flex-col items-center justify-between rounded-lg bg-white p-6">
        <div>{"Don't have an account"}</div>
        <Button text="Sign up" type="outline" href="/sign_up" />
      </section>
    </>
  );
}
