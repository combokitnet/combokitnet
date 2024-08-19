import React from "react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <ol className="flex items-center whitespace-nowrap p-[0_12px] sm:p-[0px]">
      {items.map((item, index) => (
        <li
          key={`${item?.label}_${index}`}
          className="inline-flex items-center"
        >
          {item.href ? (
            <a
              href={item.href}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {item.label}
            </a>
          ) : (
            <span className="flex items-center text-sm text-gray-500">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;
