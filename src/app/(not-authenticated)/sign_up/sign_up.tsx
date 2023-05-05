'use client';

import { useState } from 'react';

import BMLink from '../../../components/BMLink';
import logo from '../../../../public/Title.png';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const myButtonFunction = () => {
    //
  };

  return (
    <section className="mb-5 ml-30 mt-16 flex h-139 w-89 flex-col items-center justify-between rounded-lg bg-white px-9 py-8">
      <h1 className="mt-4">
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
        label="Full Name"
        name="name"
        type="name"
        placeholder="Type your full name"
        handlechange={setName}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Type your password"
        hideButton={true}
        handlechange={setPassword}
      />
      <Button text="Sign up" handleClick={myButtonFunction} />
      <div className="text-center">
        By signing up, you accept the <BMLink url="" text="Data Policy" /> and
        the <BMLink url="" text="Cookies Policy." />
      </div>
      <div>
        Already have an account? <BMLink url="/sign_in" text="Log in" />
      </div>
    </section>
  );
}
