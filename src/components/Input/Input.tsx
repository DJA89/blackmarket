import { useState } from 'react';

import visibleImage from '../../..//public/components/Input/visibility.png';
import nonVisisbleImage from '../../../public/components/Input/visibility_off.png';
import Image from 'next/image';

export default function Input({
  name,
  label,
  type = 'text',
  placeholder = '',
  hideButton = false,
  required = false,
  errorMessage = null,
  disabled = false,
  handleChange,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  hideButton?: boolean;
  required?: boolean;
  errorMessage?: string | null;
  disabled?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  const [visible, setVisible] = useState(true);

  const hiddenImage = visible ? nonVisisbleImage : visibleImage;

  let usedType = type;
  if (type === 'password' && !visible) {
    usedType = 'text';
  }

  let inputBorderClass = 'border-dark-violet';
  if (errorMessage) {
    inputBorderClass = 'border-[#D42F1A]';
  }

  return (
    <div style={{ fontFamily: 'DM Sans' }} className="flex flex-col align-top">
      <label
        htmlFor={name}
        className={`mb-1 text-base leading-5 ${
          disabled ? 'text-dark-grey' : 'text-dark-violet'
        }`}
      >
        {`${label}${required ? ' *' : ''}`}
      </label>
      <div className="relative flex">
        <input
          name={name}
          type={usedType}
          // eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname
          className={`h-11 w-72 rounded-lg border ${inputBorderClass} p-3 \
                      leading-5 placeholder:text-[#757575] \
                      hover:border-hover hover:placeholder:text-dark-grey \
                      focus:border-black focus:placeholder:text-dark-grey \
                      focus:outline-dashed focus:outline-focus \
                      active:border-active active:outline-active-outline \
                      active:placeholder:text-dark-grey \
                      disabled:border-dark-grey disabled:bg-background \
                      disabled:text-dark-grey`}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />
        {hideButton ? (
          <button
            className="absolute bottom-4 right-4 h-3"
            onClick={() => setVisible(!visible)}
          >
            <Image src={hiddenImage} alt={`Toggle ${label} visibility`} />
          </button>
        ) : null}
      </div>
      <span className="text-[#757575]">{errorMessage}</span>
    </div>
  );
}
