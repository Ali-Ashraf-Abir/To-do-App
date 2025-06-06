
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'confirm';
  onConfirm?: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  onConfirm,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <h2
              className={`text-xl font-semibold mb-2 ${
                type === 'success'
                  ? 'text-green-600'
                  : type === 'error'
                  ? 'text-red-600'
                  : 'text-yellow-500'
              }`}
            >
              {title}
            </h2>

            <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>

            {type === 'confirm' && (
              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-zinc-600 text-white hover:bg-zinc-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
