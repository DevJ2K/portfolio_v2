const PickerBar = ({
  selectedItem,
  setSelectedItem,
  items,
}: {
  selectedItem: string;
  setSelectedItem: (tag: string) => void;
  items: string[];
}) => {
  return (
    <div className="grid grid-cols-4 items-center justify-center gap-2 bg-ui-background p-2 border border-ui-border rounded-2xl picker-shadow">
      {items.map((item) => (
        <button
          key={item}
          className={`px-4 py-2 rounded-lg font-medium border-b border-r border-transparent ${
            item === selectedItem
              ? "text-blue-500 selected-shadow border-ui-border"
              : "text-foreground-secondary cursor-pointer hover:text-blue-800"
          }`}
          onClick={() => setSelectedItem(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default PickerBar;
