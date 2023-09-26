'use client';

import Logo from '~/../public/authenticated/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '~/components/Button/Button';
import smallShoppingCartSymbol from '~/../public/authenticated/smallShoppingCartSymbol.svg';
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu';
import hamburger from '~/../public/authenticated/hamburger.svg';
import SearchBar from '~/components/SearchBar';
import { signOut } from 'next-auth/react';

export default function MobileHeader() {
  const menu = useMenuState();

  return (
    <header className="flex w-full flex-col">
      <div className="flex h-23 w-full flex-row items-center justify-between bg-black p-4">
        <Link href="/home" className="mx-4 my-2 shrink-0">
          <Image src={Logo} alt="Black Market" />
        </Link>
        <div className="flex flex-row">
          <Button
            extraClasses="flex justify-around w-14 mr-2"
            overrideStyles={{ border: '1px solid #FFF' }}
            text=""
            type="primary"
            href="/#"
            aria-label="Shopping Cart"
            image={smallShoppingCartSymbol}
          />
          <div className="flex flex-row">
            <MenuButton
              {...menu}
              className={
                'flex h-11 w-14 items-center justify-around border border-white bg-black px-3 text-white hover:bg-hover active:border-active-outline active:bg-active'
              }
            >
              <Image src={hamburger} alt="" />
            </MenuButton>
            <Menu
              {...menu}
              aria-label="My Account"
              className="flex w-full flex-col"
              orientation="vertical"
            >
              <MenuItem
                {...menu}
                className="mobile-menu-item mt-3 border"
                as="a"
                href="#"
              >
                Settings
              </MenuItem>
              <MenuItem {...menu} className="mobile-menu-item" as="a" href="#">
                Previous Orders
              </MenuItem>
              <MenuItem
                {...menu}
                className="mobile-menu-item text-left"
                onClick={() => signOut()}
              >
                Log out
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="w-full bg-light-grey px-4">
        <SearchBar extraClasses="my-2 w-full" />
      </div>
    </header>
  );
}
