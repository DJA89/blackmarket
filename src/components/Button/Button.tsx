import Link from 'next/link';

type ButtonType = 'primary' | 'outline';

export default function Button({
  text,
  handleClick,
  disabled = false,
  type = 'primary',
  href,
}: {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  href?: string;
}) {
  let classes =
    'flex h-11 w-72 items-center justify-center rounded-lg  hover:border-transparent hover:bg-hover active:border-active-outline active:bg-active disabled:bg-light-grey disabled:text-dark-grey';
  if (type == 'primary') {
    classes = `${classes} bg-dark-violet text-white`;
  } else {
    classes = `${classes} border border-dark-violet bg-white text-dark-violet`;
  }

  return (
    <>
      {href ? (
        <Link href={href} className={classes}>
          {text}
        </Link>
      ) : (
        <button onClick={handleClick} className={classes} disabled={disabled}>
          {text}
        </button>
      )}
    </>
  );
}
