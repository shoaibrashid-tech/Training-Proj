import { Modal, Form, Input, InputNumber, Select, Button, Alert } from "antd";

export default function AddProductFormModal({
  open,
  setOpen,
  categories = [],
  onConfirm,
  confirmLoading = false,
  error = null,
}) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title,
        price: Number(values.price),
        description: values.description,
        categoryId: values.categoryId,
        images: values.images?.filter((img) => img && img.trim() !== ""),
      };

      await onConfirm?.(payload);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={() => !confirmLoading && setOpen(false)}
      confirmLoading={confirmLoading}
      onOk={handleSubmit}
      okText="Add Product"
      centered
      width={500}
      okButtonProps={{ className: "!bg-blue-500 hover:!bg-blue-600" }}
    >
      <Form form={form} layout="vertical" className="mt-4">
        {/* Error Message */}
        {error && <Alert type="error" message={error} className="mb-4" showIcon />}

        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Product title required" }]}
        >
          <Input placeholder="Product title" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price required" }]}
        >
          <InputNumber className="w-full" placeholder="10" min={0} />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description required" }]}
        >
          <Input.TextArea rows={3} placeholder="Product description" />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Select category" }]}
        >
          <Select
            placeholder="Select category"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
          />
        </Form.Item>

        {/* Image URLs */}
        <Form.List name="images" initialValue={[""]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Form.Item
                  label={index === 0 ? "Image URLs" : ""}
                  required={false}
                  key={key}
                >
                  <div className="flex gap-2">
                    <Form.Item
                      {...restField}
                      name={name}
                      noStyle
                      rules={[{ required: true, message: "Image URL required" }]}
                    >
                      <Input placeholder="https://placeimg.com/640/480/any" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button danger onClick={() => remove(name)}>Remove</Button>
                    )}
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add another image
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}