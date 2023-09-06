import { ChangeEvent } from 'react';

export default function Input({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  errorMessage = null,
  extraClasses = '',
  disabled = false,
  handleChange,
  value,
  visible = true,
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
  visible?: boolean;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}) {
  let usedType = type;
  if (type === 'password' && visible) {
    usedType = 'text';
  }

  let inputBorderClass = 'border-dark-violet';
  if (errorMessage) {
    inputBorderClass = 'border-[#D42F1A]';
  }

  return (
    <input
      name={name}
      type={usedType}
      // eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname
      className={`h-11 rounded-lg border ${inputBorderClass} p-3 \
                      leading-5 placeholder:text-[#757575] \
                      hover:border-hover hover:placeholder:text-dark-grey \
                      focus:border-black focus:placeholder:text-dark-grey \
                      focus-visible:outline-dashed focus-visible:outline-focus \
                      active:border-active active:outline-active-outline \
                      active:placeholder:text-dark-grey \
                      disabled:border-dark-grey disabled:bg-background \
                      disabled:text-dark-grey outline-offset-3
                      ${extraClasses}`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      aria-label={label}
      aria-required={required}
      aria-describedby={`${name}-error`}
      aria-invalid={!!errorMessage}
      autoComplete={name === 'password' ? '' : name}
      value={value}
    />
  );
}
