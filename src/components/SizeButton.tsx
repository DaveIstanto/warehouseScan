interface SizeButtonProps {
  selected: Boolean;
  size: string;
  onClick: Function;
}

const SELECTED_COLOR = "bg-yellow-300";

export const SizeButton = (props: SizeButtonProps) => {
  const { selected, size, onClick } = props;
  console.log({ selected, size });
  return (
    <button
      className={`w-full ${selected ? SELECTED_COLOR : "bg-yellow-900 "} `}
      onClick={() => onClick(size)}
    >
      <div className="text-white">{size}</div>
    </button>
  );
};
