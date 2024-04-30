// import {
//   useDialogState,
//   Dialog,
//   DialogBackdrop,
//   DialogDisclosure,
// } from 'reakit/Dialog';
import Button from '../Button';
import Modal from 'react-modal';

interface AddToCartButton {
  onClick: () => void;
}

export const AddToCartButton = ({ onClick }: AddToCartButton) => {
  // const dialog = useDialogState();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen}>test</Modal>
      {/* <DialogDisclosure {...dialog}> */}
      {/* <Button
          handleClick={onClick}
          text="Add to cart"
          extraClasses="max-md:h-5 max-md:w-24 max-md:text-sm max-md:px-2"
          alt-text={`${name}, add to cart`}
        /> */}
      {/* </DialogDisclosure>
      <DialogBackdrop {...dialog}>
        <Dialog {...dialog} aria-label="Welcome" modal>
          Welcome to Reakit!
        </Dialog>
      </DialogBackdrop> */}
    </>
  );
};
