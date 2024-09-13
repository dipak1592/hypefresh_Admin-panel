// components/DeleteModal.tsx
import React from 'react';

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50  ">
      <div className="bg-white text-black dark:bg-gray-800 p-6 rounded shadow-lg dark:bg-graydark">
        <p className="text-lg font-medium  text-black dark:text-white ">Are you sure you want to delete this user?</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
