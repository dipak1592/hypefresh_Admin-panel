import React from 'react';

interface FullscreenImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const FullscreenImageModal: React.FC<FullscreenImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 bg-graydark">
      <div className='' >
        <button
          className="top-4 right-4 text-red-600 text-6xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageSrc} alt="Fullscreen" className=" rounded-lg w-90 h-90 object-contain" />
      </div>
    </div>
  );
};

export default FullscreenImageModal;
