'use client';

import Logo from '~/../public/authenticated/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '~/components/Button/Button';
import shoppingCartSymbol from '~/../public/authenticated/shoppingCartSymbol.svg';
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu';
import dropdownArrow from '~/../public/authenticated/dropdownArrow.svg';
import SearchBar from '~/components/SearchBar';

export default function DesktopHeader() {
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
    <header className="w-full bg-black">
      <div className="flex h-23  flex-row items-center justify-between p-14">
        <Link href="/home" className="my-2 mr-6 lg:mr-15 shrink-0 xl:mr-24">
          <Image src={Logo} alt="Black Market" className="shrink-0" />
        </Link>
        <SearchBar />
        <div className="mx-6 flex flex-row">
          <MenuButton
            {...menu}
            className={`flex h-11 w-49 items-center justify-between border border-white bg-black px-3 text-white hover:bg-hover active:border-active-outline active:bg-active ${extraMenuClass}`}
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
            extraClasses="flex justify-around w-51 ml-6"
            overrideStyles={{ border: '1px solid #FFF' }}
            text="Shopping Cart"
            type="primary"
            href="/#"
            image={shoppingCartSymbol}
          />
        </div>
      </div>
    </header>
  );
}
