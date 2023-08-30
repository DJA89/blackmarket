'use client';

import BMLink from '~/components/BMLink';
import logo from '~/../public/Title.png';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Image from 'next/image';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { paths } from '~/utils/paths';

export default function SignUp() {
  const {
    handleSubmit,
    email,
    emailError,
    password,
    passwordError,
    setEmail,
    setPassword,
    name,
    setName,
    nameError,
  } = useAuthLayout();

  return (
    <section className="mb-5 ml-30 mt-16 flex h-139 w-90 flex-col items-center justify-between rounded-lg bg-white px-9 py-8">
      <h1 className="mt-4">
        <Image src={logo} alt="Black Market" />
      </h1>
      <h2 className="sr-only">Sign up</h2>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Type your email"
        value={email}
        handleChange={({ target: { value } }) => setEmail(value)}
        errorMessage={emailError}
        extraClasses="w-72"
      />
      <Input
        label="Full Name"
        name="name"
        placeholder="Type your full name"
        value={name}
        handleChange={({ target: { value } }) => setName(value)}
        errorMessage={nameError}
        extraClasses="w-72"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={password}
        placeholder="Type your password"
        hideButton={true}
        handleChange={({ target: { value } }) => setPassword(value)}
        errorMessage={passwordError}
        extraClasses="w-72"
      />
      <Button text="Sign up" handleClick={handleSubmit} extraClasses="w-72" />
      <div className="text-center">
        By signing up, you accept the <BMLink url="" text="Data Policy" /> and
        the <BMLink url="" text="Cookies Policy." />
      </div>
      <div>
        Already have an account? <BMLink url={paths.signIn} text="Log in" />
      </div>
    </section>
  );
}
