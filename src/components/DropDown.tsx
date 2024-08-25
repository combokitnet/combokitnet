import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaAngleRight } from "react-icons/fa";

interface DropDownItemProps {
  label: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  customClass?: string;
  customStyle?: React.CSSProperties;
  children?: DropDownItemProps[];
  render?: (item: DropDownItemProps) => React.ReactNode;
}

interface DropDownProps extends PropsWithChildren {
  items: DropDownItemProps[];
  customClass?: string;
  customStyle?: React.CSSProperties;
}

const DropDownItem: React.FC<{
  item: DropDownItemProps;
  closeParent: () => void;
}> = ({ item, closeParent }) => {
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
    if (item.onClick && !item.disabled) {
      item.onClick();
      closeParent();
    }
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
        <div className="flex items-center">
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.render ? item.render(item) : item.label}
        </div>

        {item.children && <FaAngleRight />}
      </button>

      {item.children && isSubOpen && (
        <div className="z-10 absolute left-full top-0 mt-0 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 transition-transform duration-200 ease-out origin-top">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {item.children.map((child, index) => (
              <DropDownItem
                key={index}
                item={child}
                closeParent={closeParent}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export const DropDown: React.FC<DropDownProps> = ({
  items,
  children,
  customClass,
  customStyle,
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
            <DropDownItem key={index} item={item} closeParent={closeDropdown} />
          ))}
        </ul>
      </div>
    </div>
  );
};
