'use client';

import { useState } from 'react';
import logo from '../../../../public/Title.png';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const myButtonFunction = () => {
    3;
  };
  return (
    <section className="ml-30 mt-16 flex h-106 w-89 flex-col items-center justify-between rounded-lg bg-white p-9">
      <h1 className="mt-3">
        <Image src={logo} alt="Black Market" />
      </h1>
      <Input
        label="Email"
        name="email"
        type="text"
        placeholder="Type your email"
        errorMessage="Great error btw"
        handlechange={setEmail}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Type your Password"
        hideButton={true}
        disabled={true}
        handlechange={setPassword}
      />
      <Button text="Log in" handleClick={myButtonFunction} />
    </section>
  );
}
