import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ConfirmModal({
  open,
  setOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">

      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-xl">

          <div className="p-6">

            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>

            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t px-6 py-4">

            <button
              onClick={() => setOpen(false)}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {confirmText}
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  );
}