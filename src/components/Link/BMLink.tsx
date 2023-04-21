import Link from 'next/Link';

export default function BMLink({
  url,
  text,
  disabled = false,
}: {
  url: string;
  text: string;
  disabled: boolean;
}) {
  return (
    <>
      {disabled ? (
        <button className="font-dm-sans font-bold text-dark-grey" disabled>
          {text}
        </button>
      ) : (
        <Link
          href={url}
          className="font-dm-sans font-bold text-links hover:underline active:text-active active:underline"
        >
          {text}
        </Link>
      )}
    </>
  );
}
