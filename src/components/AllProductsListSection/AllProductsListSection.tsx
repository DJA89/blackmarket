'use client';

import GeneralProductCard from '../GeneralProductCard';
import { useEffect, useState, useCallback } from 'react';
import { useApi } from '~/hooks/useApi';
import Checkmark from '~/../public/authenticated/checkmark.svg';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { Product } from '~/types/product';
import lessThan from '~/../public/authenticated/lessThan.svg';
import greaterThan from '~/../public/authenticated/greaterThan.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Button from '~/components/Button';
import Modal from 'react-modal';
import closeModal from '~/../public/authenticated/close-modal.svg';

const maxProductsPerpage = 6;

export default function AllProductsListSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [productAddedToCart, setProductAddedToCart] =
    useState<Product | null>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [cart, setCart] = useState<
    Array<{ quantity: number; product: Product }>
  >([]);

  const { session } = useAuthLayout();
  const { doPost, doGet } = useApi({ session });
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');

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

  const fetchProducts = useCallback(
    async (currentPage: number) => {
      const searchRequest = search ? `&search=${search}` : '';
      const products = await doGet({
        endpoint: `/api/products/?page=${currentPage}&page_size=${maxProductsPerpage}${searchRequest}`,
      });
      setNoProductsFound(products.count < 1);
      setMaxPage(Math.ceil(products.count / maxProductsPerpage));
      setProducts(products.results);
      setLoaded(true);
      console.log(products);
    },
    [doGet, search]
  );

  const fetchCart = useCallback(async () => {
    const cart = await doGet({ endpoint: '/api/shopping-cart/' });
    setCart(cart['order_products']);
  }, [doGet]);

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCart();
  }, [fetchProducts, fetchCart, currentPage]);

  const previousPage = (currentPage: number) => {
    return Math.max(currentPage - 1, 1);
  };

  const nextPage = (currentPage: number) => {
    return Math.min(currentPage + 1, maxPage);
  };

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

  const addProductToCart = useCallback(
    async (product: Product) => {
      await doPost({
        endpoint: '/api/shopping-cart/products/',
        body: {
          product: product.id,
          quantity: quantityForProduct(product.id) + 1,
        },
      });
      const newCart = await doGet({ endpoint: '/api/shopping-cart/' });
      setProductAddedToCart(product);
      setCart(newCart['order_products']);
      setIsOpen(true);
    },
    [doGet, doPost, quantityForProduct]
  );

  return (
    <>
      {productAddedToCart ? (
        <Modal isOpen={isOpen} style={modalStyles}>
          <div className="flex h-121 flex-col items-center justify-between px-8 py-7 md:h-63 md:w-210 md:flex-row xl:mr-8 xl:w-265">
            <div className="relative mr-8 h-44 w-65 rounded-lg border border-green-600 xl:mr-0">
              <Image
                src={productAddedToCart.product_picture}
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
      ) : null}
      {noProductsFound ? (
        <div className="my-10">No products match your search</div>
      ) : (
        <>
          <ul className="mt-4 shadow-slight-blurr md:shadow-none">
            {products.map((product, index, array) => {
              return (
                <li key={product.id}>
                  <GeneralProductCard
                    product={product}
                    firstProduct={index === 0}
                    lastProduct={index === array.length - 1}
                    addProductToCart={addProductToCart}
                  />
                </li>
              );
            })}
          </ul>
          {loaded ? (
            <div className="relative mb-10 mt-6 flex justify-between md:my-0">
              <button
                onClick={() => setCurrentPage(previousPage)}
                className="flex items-center"
              >
                <Image src={lessThan} alt="" className="mr-3 h-2 w-3" />
                Previous Page
              </button>
              Page {currentPage} of {maxPage}
              <button
                onClick={() => setCurrentPage(nextPage)}
                className="flex items-center"
              >
                Next Page
                <Image src={greaterThan} alt="" className="ml-3 h-2 w-3" />
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
