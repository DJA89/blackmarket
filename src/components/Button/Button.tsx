export default function Button({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) {
  return (
    <div
      onClick={handleClick}
      className="flex h-11 w-72 items-center justify-center rounded-lg bg-black text-white"
    >
      {text}
    </div>
  );
}
