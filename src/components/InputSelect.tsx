import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

interface DropDownItemProps {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  customClass?: string;
  customStyle?: React.CSSProperties;
  children?: DropDownItemProps[];
  render?: (item: DropDownItemProps, selected: string[]) => React.ReactNode;
}

const DropDownItem: React.FC<{
  item: DropDownItemProps;
  closeParent: () => void;
  selected: string[];
  onPick: (value: string) => void;
}> = ({ item, closeParent, selected, onPick }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const toggleSubMenu = () => setIsSubOpen(!isSubOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsSubOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    onPick(item?.value);
  };

  return (
    <li ref={itemRef} className="relative">
      <button
        onClick={item.children ? toggleSubMenu : handleClick}
        className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
          item.disabled ? "cursor-not-allowed opacity-50" : ""
        } ${item.customClass}`}
        style={item.customStyle}
        disabled={item.disabled}
      >
        <div className="w-full">
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.render ? item.render(item, selected) : item.label}
        </div>

        {item.children && <FaAngleRight />}
      </button>

      {item.children && isSubOpen && (
        <div className="z-10 absolute left-full top-0 mt-0 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 transition-transform duration-200 ease-out origin-top">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {item.children.map((child, index) => (
              <DropDownItem
                selected={selected}
                key={index}
                item={child}
                closeParent={closeParent}
                onPick={onPick}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

interface DropDownProps extends PropsWithChildren {
  items: DropDownItemProps[];
  customClass?: string;
  customStyle?: React.CSSProperties;
  selected: string[];
  onPick: (value: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  items,
  children,
  customClass,
  customStyle,
  selected,
  onPick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative inline-block text-left ${customClass}`}
      ref={dropdownRef}
      style={customStyle}
    >
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            onClick: toggleDropdown,
          })
        : children}

      <div
        className={`z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 transition-transform duration-200 ease-out origin-top ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {items.map((item, index) => (
            <DropDownItem
              selected={selected}
              key={index}
              item={item}
              closeParent={closeDropdown}
              onPick={onPick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export interface TPropsInputSelect {
  items: DropDownItemProps[];
  title?: string;
  showTitle?: boolean;
  isMultiple?: boolean;
  defaultValue?: string[];
  onChange: (selected: string[]) => void;
}

export default function InputSelect({
  items,
  isMultiple,
  title,
  defaultValue,
  showTitle,
  onChange,
}: TPropsInputSelect) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const onPick = (value: string) => {
    let s = [...selected];

    if (selected?.includes(value)) {
      s = s?.filter((k) => k !== value);
    }

    if (isMultiple) {
      s.push(value);
    } else {
      s = [value];
    }

    setSelected(s);
    onChange(s);
  };

  let valueRaws = items
    ?.filter((m) => selected?.includes(m?.value))
    ?.map((m) => m?.label);

  return (
    <DropDown selected={selected} items={items} onPick={onPick}>
      <button
        type="button"
        role="combobox"
        dir="ltr"
        className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-7 text-xs"
      >
        {title && showTitle && (
          <span className="text-muted-foreground">
            {title}
            {selected?.length > 0 ? ":" : ""}{" "}
          </span>
        )}

        {selected?.length > 0 ? (
          <span className="pl-1 select-none">{valueRaws?.join(", ")}</span>
        ) : (
          <></>
        )}

        <FaAngleDown className="pl-1" size={16} />
      </button>
    </DropDown>
  );
}
