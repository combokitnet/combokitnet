import React, { ReactNode, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  footerButtons?: Array<{
    label: string;
    onClick: () => void;
    className?: string;
  }>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  footerButtons,
}) => {
  useEffect(() => {
    if (!footerButtons) {
      footerButtons = [{ label: "Close", onClick: onClose }];
    }
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300 ease-out ">
      <div className="relative w-full  bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-95 translate-y-4 ">
        <div className="opacity-100 scale-100 translate-y-0 transition-all duration-300 ease-out">
          <div className="flex justify-between items-center border-b p-4">
            {title && (
              <h3 className="text-xl font-semibold text-black">{title}</h3>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className="p-4 bg-white overflow-y-scroll overflow-x-hidden max-h-[80vh]">
            {children}
          </div>
          <div className="flex justify-end p-4 border-t">
            {footerButtons?.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`px-4 py-2 text-sm font-medium rounded-lg border mr-2 ${
                  button.className ? button.className : "bg-blue-500 text-white"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
