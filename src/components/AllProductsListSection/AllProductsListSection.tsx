'use client';

import GeneralProductCard from '../GeneralProductCard';
import { useEffect, useState, useCallback } from 'react';
import { useApi } from '~/hooks/useApi';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { Product } from '~/types/product';
import lessThan from '~/../public/authenticated/lessThan.svg';
import greaterThan from '~/../public/authenticated/greaterThan.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import AddToCartModal from '../AddToCartModal';

const maxProductsPerpage = 6;

export default function AllProductsListSection() {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [productAddedToCart, setProductAddedToCart] = useState<Product | null>(
    null
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [cart, setCart] = useState<
    Array<{ quantity: number; product: Product }>
  >([]);

  const { session } = useAuthLayout();
  const { doPost, doGet } = useApi({ session });
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');

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

  const quantityForProduct = (id: string): number => {
    const item = cart.find((cartItem) => {
      return cartItem.product?.id === id;
    });

    if (!item) {
      return 0;
    }

    return item.quantity;
  };

  const onAddProductToCart = async (product: Product) => {
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
    setOpenModal(true);
  };

  return (
    <>
      <AddToCartModal
        openModal={openModal}
        onModalClose={() => setOpenModal(false)}
        product={productAddedToCart}
      />
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
                    onAddProductToCart={onAddProductToCart}
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
