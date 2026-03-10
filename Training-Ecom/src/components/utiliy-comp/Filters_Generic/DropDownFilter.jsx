import React, { useState, useRef } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function DropDownFilter({ items, selectedKey, setSelectedKey }) {
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);

  // Add "All" option
  const menuItems = [
    { key: "all", label: "All" },
    ...items,
  ];

  const handleMenuClick = ({ key }) => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (key === "all") {
        setSelectedKey(null);
      } else {
        setSelectedKey(Number(key));
      }
      setOpen(false);
    }, 400);
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
  };

  const selectedItem =
    selectedKey === null
      ? { label: "All" }
      : items.find((item) => item.key === selectedKey);

  return (
    <div className="h-10 w-full flex justify-center items-center border-2 border-blue-500 rounded-md">
      <Dropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
        }}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between w-full p-5 text-blue-500"
        >
          <span>{selectedItem ? selectedItem.label : "Category"}</span>
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
}