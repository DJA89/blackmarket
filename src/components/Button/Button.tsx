import Link from 'next/link';
import Image from 'next/image';

type ButtonType = 'primary' | 'outline';

export default function Button({
  borderColour = null,
  text,
  handleClick,
  disabled = false,
  type = 'primary',
  href,
  overrideStyles = {},
  extraClasses = '',
  image = null,
}: {
  borderColour?: string | null;
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  href?: string;
  overrideStyles?: object;
  extraClasses?: string;
  image?: HTMLImageElement | null;
}) {
  let classes =
    'border px-4 flex h-11 items-center justify-center rounded-lg\
    hover:border-transparent hover:bg-hover active:border-active-outline\
    active:bg-active disabled:bg-light-grey disabled:text-dark-grey';
  if (type == 'primary') {
    borderColour ||= '';
    classes = `${classes} bg-dark-violet text-white`;
  } else {
    borderColour ||= 'border-dark-violet';
    classes = `${classes} bg-white text-dark-violet`;
  }

  classes = `${classes} ${borderColour}`;

  classes = `${classes} ${extraClasses}`;

  return (
    <>
      {href ? (
        <Link href={href} className={classes} style={overrideStyles}>
          {text}
          {image ? <Image src={image} alt={''} /> : null}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={classes}
          style={overrideStyles}
          disabled={disabled}
        >
          {text}
          {image ? <Image src={image} alt={''} /> : null}
        </button>
      )}
    </>
  );
}
