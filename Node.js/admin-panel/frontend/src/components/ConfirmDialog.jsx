import Modal from "./Modal.jsx";

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm Action">
      <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
