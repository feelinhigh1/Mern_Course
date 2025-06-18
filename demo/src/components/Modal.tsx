import React, { useState } from "react";

interface ModalProps {
  title: string;
  content: string;
}

export default function Modal({ title, content }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded"
        onClick={openModal}
      >
        Open Modal
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          />

          {/* Modal box */}
          <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
            <div
              className="bg-white p-6 rounded shadow-lg pointer-events-auto max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p>{content}</p>

              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
