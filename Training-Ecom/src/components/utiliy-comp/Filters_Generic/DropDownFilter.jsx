import React, { useState, useRef } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export default function DropDownFilter({ items, selectedKey, setSelectedKey }) {
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);

  const formattedItems = items
    .filter(item => item.key !== "all") 
    .map((item) => ({
      key: item.id.toString(),
      label: item.name,
    }));

  const menuItems = [
    { key: "all", label: "All" },
    ...formattedItems,
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
      ? { name: "All" }
      : items.find((item) => item.id === selectedKey);

  return (
    <div className="h-10 w-full flex justify-center items-center border-2 border-blue-500 rounded-md bg-white">
      <Dropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          selectable: true,
          defaultSelectedKeys: [selectedKey ? selectedKey.toString() : "all"],
        }}
        open={open}
        onOpenChange={handleOpenChange}
        trigger={['click']}
        
      >
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between w-full px-4 text-blue-500 cursor-pointer"
        >
          <span className="truncate">
            {selectedItem ? selectedItem.name : "Category"}
          </span>
          <DownOutlined className="text-xs ml-2" />
        </a>
      </Dropdown>
    </div>
  );
}