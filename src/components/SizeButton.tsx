interface SizeButtonProps {
  selected: Boolean;
  size: string;
  onClick: Function;
}

export const SizeButton = (props: SizeButtonProps) => {
  const { selected, size, onClick } = props;
  return (
    <button
      className={`w-full my-1 rounded h-16 py-2 px-4 border-gray-800 transition-all ${
        selected ? "bg-yellow-300" : "bg-gray-600 border-b-8"
      } `}
      onClick={() => onClick(size)}
    >
      <div
        className={`${selected ? "text-black" : "text-white"} font-semibold`}
      >
        {size}
      </div>
    </button>
  );
};
