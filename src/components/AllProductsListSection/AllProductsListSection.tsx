'use client';

import GeneralProductCard from '../GeneralProductCard';
import { useEffect, useState, useCallback } from 'react';
import { useApi } from '~/hooks/useApi';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { Product } from '~/types/product';
import lessThan from '~/../public/authenticated/lessThan.svg';
import greaterThan from '~/../public/authenticated/greaterThan.svg';
import Image from 'next/image';

const maxProductsPerpage = 6;

export default function AllProductsListSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { session } = useAuthLayout();
  const { doGet } = useApi({ session });

  const fetchProducts = useCallback(
    async (currentPage: number) => {
      const products = await doGet({
        endpoint: `/api/products/?page=${currentPage}&page_size=${maxProductsPerpage}`,
      });
      setNoProductsFound(products.count < 1);
      setMaxPage(Math.ceil(products.count / maxProductsPerpage));
      setProducts(products.results);
      setLoaded(true);
    },
    [doGet]
  );

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const previousPage = (currentPage: number) => {
    return Math.max(currentPage - 1, 1);
  };

  const nextPage = (currentPage: number) => {
    return Math.min(currentPage + 1, maxPage);
  };

  return (
    <>
      {noProductsFound ? (
        <div className="my-10">No products match your search</div>
      ) : (
        <>
          <ul className="mt-4 shadow-slight-blurr md:shadow-none">
            {products.map((product, index, array) => {
              return (
                <li key={product.id}>
                  <GeneralProductCard
                    image={product.product_picture}
                    price={product.unit_price}
                    name={product.name}
                    state={product.state_display}
                    favourite={product.is_favorite}
                    firstProduct={index === 0}
                    lastProduct={index === array.length - 1}
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
