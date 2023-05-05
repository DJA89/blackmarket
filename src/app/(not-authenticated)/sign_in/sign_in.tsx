'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BMLink from '../../../components/BMLink';
import logo from '../../../../public/Title.png';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const myButtonFunction = () => {
    //
  };

  return (
    <>
      <section className="mb-5 ml-30 mt-16 flex h-106 w-89 flex-col items-center justify-between rounded-lg bg-white p-9">
        <h1 className="mt-3">
          <Image src={logo} alt="Black Market" />
        </h1>
        <Input
          label="Email"
          name="email"
          type="text"
          placeholder="Type your email"
          handlechange={setEmail}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Type your password"
          hideButton={true}
          handlechange={setPassword}
        />
        <Button text="Log in" handleClick={myButtonFunction} />
        <BMLink url="" text="I forgot my password" />
      </section>
      <section className="ml-30 flex h-32 w-89 flex-col items-center justify-between rounded-lg bg-white p-6">
        <div>{"Don't have an account"}</div>
        <Button
          text="Sign up"
          type="outline"
          handleClick={() => router.push('/sign_up')}
        />
      </section>
    </>
  );
}
