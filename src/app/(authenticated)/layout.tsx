'use client';

import Logo from '~/../public/authenticated/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import shoppingCartSymbol from '~/../public/authenticated/shoppingCartSymbol.svg';

export default function Layout() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex h-23 w-full flex-row items-center justify-between bg-black p-14">
      <Link href="/home">
        <Image src={Logo} alt="Home" />
      </Link>
      <Input
        name="Search"
        label="Search"
        placeholder="Search for products"
        value={searchValue}
        extraClasses="w-121"
        handleChange={({ target: { value } }) => setSearchValue(value)}
      />
      <Button
        extraClasses="flex justify-around w-51"
        overrideStyles={{ border: '0.5px solid #FFF;' }}
        text="Shopping Cart"
        type="primary"
        href="/#"
        image={shoppingCartSymbol}
      />
    </div>
  );
}
