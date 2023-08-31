'use client';

import Logo from '~/../public/authenticated/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import shoppingCartSymbol from '~/../public/authenticated/shoppingCartSymbol.svg';
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu';
import dropdownArrow from '~/../public/authenticated/dropdownArrow.svg';

export default function Layout() {
  const [searchValue, setSearchValue] = useState('');
  const menu = useMenuState();

  let extraArrowClass = '';
  let extraMenuClass = '';
  if (menu.visible) {
    extraMenuClass = 'rounded-t-lg';
    extraArrowClass = 'rotate-180';
  } else {
    extraMenuClass = 'rounded-lg';
  }
  return (
    <div className="flex h-23 w-full flex-row items-center justify-between bg-black p-14">
      <Link href="/home">
        <Image src={Logo} alt="Home" />
      </Link>
      <Input
        name="Search"
        placeholder="Search for products"
        value={searchValue}
        extraClasses="w-121"
        handleChange={({ target: { value } }) => setSearchValue(value)}
      />
      <MenuButton
        {...menu}
        className={`flex h-11 w-49 items-center justify-between border border-white bg-black px-3 text-white ${extraMenuClass}`}
      >
        <span className="ml-2">My Account</span>
        <Image src={dropdownArrow} alt="" className={extraArrowClass} />
      </MenuButton>
      <Menu
        {...menu}
        aria-label="My Account"
        className="flex flex-col"
        orientation="vertical"
      >
        <MenuItem {...menu} className="menu-item" as="a" href="#">
          Settings
        </MenuItem>
        <MenuItem {...menu} className="menu-item" as="a" href="#">
          Previous Orders
        </MenuItem>
        <MenuItem {...menu} className="menu-item rounded-b-lg text-left">
          Log out
        </MenuItem>
      </Menu>
      <Button
        extraClasses="flex justify-around w-51"
        overrideStyles={{ border: '1px solid #FFF;' }}
        text="Shopping Cart"
        type="primary"
        href="/#"
        image={shoppingCartSymbol}
      />
    </div>
  );
}
