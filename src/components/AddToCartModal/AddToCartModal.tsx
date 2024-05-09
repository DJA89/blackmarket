import Modal from 'react-modal';
import Image from 'next/image';
import { Product } from '~/types/product';
import Checkmark from '~/../public/authenticated/checkmark.svg';
import Button from '~/components/Button';
import closeModal from '~/../public/authenticated/close-modal.svg';

export default function AddToCartModal({
  openModal,
  product,
  onModalClose,
}: {
  openModal: boolean;
  product: Product | null;
  onModalClose: () => void;
}) {
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

  return (
    <Modal isOpen={openModal} style={modalStyles}>
      <div className="flex h-121 flex-col items-center justify-between px-8 py-7 md:h-63 md:w-210 md:flex-row xl:mr-8 xl:w-265">
        <div className="relative mr-8 h-44 w-65 rounded-lg border border-green-600 xl:mr-0">
          <Image
            src={product?.product_picture || ''}
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
            {`${product?.name} has been successfully added to your shopping cart!`}
          </div>
          <div className="text-xl">
            You can go to the checkout or keep looking for more awesome items!
          </div>
          <div className="flex">
            <Button
              text="Go to checkout"
              extraClasses="h-11 w-45 mr-4"
              handleClick={onModalClose} // Yes, this will go to checkout in the future instead
            />
            <Button
              text="Continue shopping"
              type="outline"
              extraClasses="h-11 w-45"
              handleClick={onModalClose}
            />
          </div>
        </div>
        <div className="relative hidden h-44 w-29 md:block">
          <Button
            text=""
            image={closeModal}
            extraClasses="absolute right-0 top-0 bg-transparent border-none"
            handleClick={onModalClose}
          />
        </div>
      </div>
    </Modal>
  );
}
