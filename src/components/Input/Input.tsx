import { useState, ChangeEvent } from 'react';

import visibleImage from '~/../public/components/Input/visibility.png';
import nonVisisbleImage from '~/../public/components/Input/visibility_off.png';
import Image from 'next/image';
import InnerInput from './InnerInput';

export default function Input({
  name,
  label,
  type = 'text',
  placeholder = '',
  hideButton = false,
  required = false,
  errorMessage = null,
  extraClasses = '',
  disabled = false,
  handleChange,
  value,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  hideButton?: boolean;
  required?: boolean;
  errorMessage?: string | null;
  extraClasses?: string;
  disabled?: boolean;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}) {
  const [visible, setVisible] = useState(false);

  const hiddenImage = visible ? visibleImage : nonVisisbleImage;

  let usedType = type;
  if (type === 'password' && visible) {
    usedType = 'text';
  }

  let inputBorderClass = 'border-dark-violet';
  if (errorMessage) {
    inputBorderClass = 'border-[#D42F1A]';
  }

  return (
    <div className="flex flex-col align-top">
      <label
        htmlFor={name}
        className={`mb-1 text-base leading-5 ${
          disabled ? 'text-dark-grey' : 'text-dark-violet'
        }`}
      >
        {`${label}${required ? ' *' : ''}`}
      </label>
      <div className="relative flex">
        <InnerInput
          name={name}
          type={usedType}
          extraClasses={extraClasses}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label}
          required={required}
          aria-describedby={`${name}-error`}
          errorMessage={errorMessage}
          value={value}
          handleChange={handleChange}
          visible={visible}
        />
        {hideButton ? (
          <button
            type="button"
            aria-pressed={visible}
            aria-label={`Show password`}
            className="absolute bottom-4 right-4 h-3"
            onClick={() => setVisible(!visible)}
          >
            <Image src={hiddenImage} alt={`Toggle ${label} visibility`} />
          </button>
        ) : null}
      </div>
      <span className="h-4 text-[#757575]" id={`${name}-error`} role="alert">
        {errorMessage}
      </span>
    </div>
  );
}
