'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Checkmark from '~/../public/authenticated/checkmark.svg';
import NotFavourite from '~/../public/authenticated/not-favourite.svg';
import Favourite from '~/../public/authenticated/favourite.svg';
import Button from '~/components/Button';
import { useApi } from '~/hooks/useApi';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import Modal from 'react-modal';
import closeModal from '~/../public/authenticated/close-modal.svg';

export default function GeneralProductCard({
  id,
  image,
  price,
  name,
  state,
  favourite,
  firstProduct = false,
  lastProduct = false,
  cart,
  setCart,
}: {
  id: string;
  image: string;
  price: number;
  name: string;
  state: string;
  favourite: boolean;
  firstProduct?: boolean;
  lastProduct?: boolean;
  cart: Array<{ quantity: number; product: { id: string } }>;
  setCart: Function;
  setAddedToCartVisible: Function;
  setAddedToCartProduct: Function;
}) {
  const { session } = useAuthLayout();
  const { doPost, doGet } = useApi({ session });
  const [isOpen, setIsOpen] = useState(false);

  const modalStyles = {
    content: {
      margin: 'auto',
      width: 'fit-content',
      height: 'fit-content',
      top: 32,
      padding: 0,
      display: 'inline-block',
    },
  };

  const stateBackgroundColour =
    state === 'Restored' ? 'bg-[#559F21]' : 'bg-[#F2C94C]';
  const favouriteIcon = favourite ? Favourite : NotFavourite;

  let extraClasses = '';

  const quantityForProduct = useCallback(
    (id: string): number => {
      const item = cart.find((cartItem) => {
        return cartItem.product?.id === id;
      });

      if (!item) {
        return 0;
      } else {
        return item.quantity;
      }
    },
    [cart]
  );

  const addProductToCart = async () => {
    await doPost({
      endpoint: '/api/shopping-cart/products/',
      body: { product: id, quantity: quantityForProduct(id) + 1 },
    });
    const newCart = await doGet({ endpoint: '/api/shopping-cart/' });
    setCart(newCart['order_products']);
    setIsOpen(true);
  };

  if (firstProduct) {
    extraClasses = 'rounded-t-lg';
  }

  if (lastProduct) {
    extraClasses = `${extraClasses} rounded-b-lg`;
  } else {
    extraClasses = `${extraClasses} border-b border-black md:border-none`;
  }

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
          {/* <AddToCartButton onClick={addProductToCart} /> */}
          <Button
            text="Add to cart"
            handleClick={addProductToCart}
            extraClasses="max-md:h-5 max-md:w-24 max-md:text-sm max-md:px-2"
            ariaLabel={`${name}, add to cart`}
          />
          <Modal isOpen={isOpen} style={modalStyles}>
            <div className="flex h-121 flex-col items-center justify-between px-8 py-7 md:h-63 md:w-210 md:flex-row xl:mr-8 xl:w-265">
              <div className="relative mr-8 h-44 w-65 rounded-lg border border-green-600 xl:mr-0">
                <Image
                  src={image}
                  alt=""
                  fill={true}
                  className="h-full w-full object-contain"
                />
                <Image
                  src={Checkmark}
                  alt=""
                  className="absolute bottom-0 right-0 h-12 w-12"
                />
              </div>
              <div className="flex h-44 w-145 flex-col items-center justify-between text-dark-violet xl:mt-4">
                <div className="text-2xl font-bold">
                  {`${name} has been successfully added to your shopping cart!`}
                </div>
                <div className="text-xl">
                  You can go to the checkout or keep looking for more awesome
                  items!
                </div>
                <div className="flex">
                  <Button
                    text="Go to checkout"
                    extraClasses="h-11 w-45 mr-4"
                    handleClick={() => {
                      setIsOpen(false);
                    }}
                  />
                  <Button
                    text="Continue shopping"
                    type="outline"
                    extraClasses="h-11 w-45"
                    handleClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
              <div className="relative hidden h-44 w-29 md:block">
                <Button
                  text=""
                  image={closeModal}
                  extraClasses="absolute right-0 top-0 bg-transparent border-none"
                  handleClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
