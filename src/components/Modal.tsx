import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300 ease-out">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-95 translate-y-4">
        <div className="opacity-100 scale-100 translate-y-0 transition-all duration-300 ease-out">
          <div className="flex justify-between items-center border-b p-4">
            {title && <h3 className="text-xl font-semibold">{title}</h3>}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="p-4 bg-white">{children}</div>
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
