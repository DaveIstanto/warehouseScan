interface SizeButtonProps {
  selected: Boolean;
  size: string;
  onClick: Function;
}

const SELECTED_COLOR = "bg-yellow-300";

export const SizeButton = (props: SizeButtonProps) => {
  const { selected, size, onClick } = props;
  console.log(selected);
  return (
    <button
      className={`w-full bg-yellow-900 ${selected && SELECTED_COLOR} `}
      onClick={() => onClick(size)}
    >
      <div className="text-white">{size}</div>
    </button>
  );
};
