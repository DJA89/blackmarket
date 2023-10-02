'use client';
import Image from 'next/image';
import Link from 'next/link';

import NotFavourite from '~/../public/authenticated/not-favourite.svg';
import Favourite from '~/../public/authenticated/favourite.svg';

export default function ProductCard({
  image,
  price,
  name,
  state,
  favourite,
}: {
  image: string;
  price: number;
  name: string;
  state: string;
  favourite: boolean;
}) {
  const stateBackgroundColour =
    state === 'Restored' ? 'bg-[#559F21]' : 'bg-[#F2C94C]';
  const favouriteIcon = favourite ? Favourite : NotFavourite;

  return (
    <div className="h-49 w-34 rounded-lg border bg-white shadow-slight-blurr md:h-94 md:w-66">
      <Link href="#">
        <div className="relative h-30 w-34 rounded-t-lg md:h-62 md:w-66">
          <Image
            src={image}
            alt={name}
            fill={true}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>
      <div className="relative z-40 flex h-19 w-34 flex-col justify-between rounded-b-lg p-2 shadow-slight-blurr md:h-32 md:w-66 md:px-4 md:py-6">
        <div className="flex justify-between">
          <div>${Math.round(price)}</div>
          <div
            className={`flex items-center rounded ${stateBackgroundColour} px-1 text-sm text-white`}
          >
            Restored
          </div>
        </div>
        <div className="flex justify-between">
          <span className="line-clamp-1">{name}</span>
          <button alt-text="Mark as favourite">
            <Image src={favouriteIcon} alt="Not favourite icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
