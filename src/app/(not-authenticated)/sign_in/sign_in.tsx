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
    if (isSignInValid()) {
      signIn('credentials', {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: paths.home,
      });
    }
  };

  return (
    <>
      <section className="mb-5 ml-30 mt-16 flex h-106 w-90 flex-col items-center justify-between rounded-lg bg-white p-9">
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
          extraClasses="w-72"
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
          extraClasses="w-72"
        />
        <Button text="Log in" handleClick={handleSignIn} extraClasses="w-72" />
        <BMLink url="" text="I forgot my password" />
      </section>
      <section className="ml-30 flex h-32 w-90 flex-col items-center justify-between rounded-lg bg-white p-6">
        <div>{"Don't have an account"}</div>
        <Button text="Sign up" type="outline" href="/sign_up" />
      </section>
    </>
  );
}
