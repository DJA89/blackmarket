import Link from 'next/link';

export default function BMLink({
  url,
  text,
  disabled = false,
}: {
  url: string;
  text: string;
  disabled?: boolean;
}) {
  return (
    <>
      {disabled ? (
        <button className="font-bold text-dark-grey" disabled>
          {text}
        </button>
      ) : (
        <Link
          href={url}
          className="font-bold text-links hover:underline active:text-active active:underline"
        >
          {text}
        </Link>
      )}
    </>
  );
}
