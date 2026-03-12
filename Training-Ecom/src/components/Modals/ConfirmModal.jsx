import { Modal, Button } from "antd";

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
    <Modal
      title={title}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={[
        // Custom footer layout using Tailwind for gap and styling
        <div key="footer" className="flex justify-end gap-3">
          <Button onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button 
            type="primary" 
            danger // Optional: use this if it's a destructive action
            className="bg-indigo-600 hover:!bg-indigo-700"
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            {confirmText}
          </Button>
        </div>
      ]}
    >
      <p className="text-sm text-gray-500 py-2">
        {description}
      </p>
    </Modal>
  );
}