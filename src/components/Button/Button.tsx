type ButtonType = 'primary' | 'outline';

export default function Button({
  text,
  handleClick,
  disabled = false,
  type = 'primary',
}: {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  type?: ButtonType;
}) {
  let classesForType = '';
  if (type == 'primary') {
    classesForType = 'bg-dark-violet text-white';
  } else {
    classesForType = 'border border-dark-violet bg-white text-dark-violet';
  }
  return (
    <button
      onClick={handleClick}
      className={`flex h-11 w-72 items-center justify-center rounded-lg ${classesForType} hover:border-transparent hover:bg-hover active:border-active-outline active:bg-active disabled:bg-light-grey disabled:text-dark-grey`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
