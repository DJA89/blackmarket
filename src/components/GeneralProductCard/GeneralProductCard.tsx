'use client';

import Image from 'next/image';
import NotFavourite from '~/../public/authenticated/not-favourite.svg';
import Favourite from '~/../public/authenticated/favourite.svg';
import Button from '~/components/Button';
import { Product } from '~/types/product';

export default function GeneralProductCard({
  product,
  firstProduct = false,
  lastProduct = false,
  onAddProductToCart,
}: {
  product: Product;
  firstProduct?: boolean;
  lastProduct?: boolean;
  onAddProductToCart: (product: Product) => Promise<void>;
}) {
  const {
    id,
    product_picture: image,
    unit_price: price,
    name,
    state_display: state,
    is_favorite: favourite,
  } = product;

  const stateBackgroundColour =
    state === 'Restored' ? 'bg-[#559F21]' : 'bg-[#F2C94C]';
  const favouriteIcon = favourite ? Favourite : NotFavourite;

  let extraClasses = '';

  if (firstProduct) {
    extraClasses = 'rounded-t-lg';
  }

  if (lastProduct) {
    extraClasses = `${extraClasses} rounded-b-lg`;
  } else {
    extraClasses = `${extraClasses} border-b border-black md:border-none`;
  }

  const onAddToCartClick = () => {
    onAddProductToCart(product);
  };

  return (
    <div
      className={`flex h-30 w-full bg-white md:mb-5 md:h-46 md:w-210 md:rounded-lg md:shadow-slight-blurr ${extraClasses}`}
    >
      <div className="relative h-30 w-20 shrink-0 md:h-46 md:w-49">
        <Image
          src={image}
          alt=""
          fill={true}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mx-6 flex h-30 w-full justify-between py-6 md:mx-10 md:h-46 md:w-141 md:py-10">
        <div className="flex flex-col justify-between">
          <div>
            <span className="line-clamp-1 text-sm font-bold md:line-clamp-none md:text-2xl">
              {name}
            </span>
            <div
              className={`flex w-fit items-center rounded ${stateBackgroundColour} px-1 text-sm text-white`}
            >
              {state}
            </div>
          </div>
          <div className="text-sm md:text-2xl">${price}</div>
        </div>
        <div className="flex flex-col items-center justify-between md:pt-4">
          <Image
            src={favouriteIcon}
            alt="Mark as favourite"
            className="h-4 w-5 md:h-6 md:w-6"
          />
          <Button
            text="Add to cart"
            handleClick={onAddToCartClick}
            extraClasses="max-md:h-5 max-md:w-24 max-md:text-sm max-md:px-2"
            ariaLabel={`${name}, add to cart`}
          />
        </div>
      </div>
    </div>
  );
}
