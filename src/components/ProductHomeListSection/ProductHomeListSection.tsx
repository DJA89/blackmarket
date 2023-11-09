'use client';

import ProductCard from '~/components/HomeProductCard/HomeProductCard';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useApi } from '~/hooks/useApi';
import { useAuthLayout } from '~/hooks/useAuthLayout';
import { Product } from '~/types/product';

export default function ProductHomeListSection() {
  const [products, setProducts] = useState<Product[]>([]);

  const { session } = useAuthLayout();
  const { doGet } = useApi({ session });

  const fetchProducts = useCallback(async () => {
    const products = await doGet({ endpoint: '/api/products/' });
    setProducts(products.results.slice(0, 4));
  }, [doGet]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="w-full bg-background pb-4 md:h-auto md:bg-gradient-to-b md:from-[#000000_51.5%] md:to-[#FFFFFF_51.5%] md:pt-0">
      <h2 className="sr-only">Products</h2>
      <div className="hidden-scrollbar w-full overflow-x-scroll pb-4 pt-8">
        <ul className="mx-auto flex w-142 justify-around md:mt-7 md:h-106 md:w-282">
          {products.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard
                  image={product.product_picture}
                  price={product.unit_price}
                  name={product.name}
                  state={product.state_display}
                  favourite={product.is_favorite}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="my-4 flex h-6 justify-center align-middle md:mb-10 md:mt-5">
        <Link href="/products" className="font-bold text-blue-600">
          See all
        </Link>
      </div>
    </section>
  );
}
