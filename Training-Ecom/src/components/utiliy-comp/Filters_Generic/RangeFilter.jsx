import React, { useState, useRef } from "react";
import { Dropdown, Slider } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function RangeFilter({ label, min, max, range, setRangeHandle }) {
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const onChange = (value) => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setRangeHandle(value);
    }, 400); // debounce delay
  };

  return (
    <div className="h-10 w-full flex justify-center items-center border-2 border-blue-500 rounded-md">
      <Dropdown
        open={open}
        onOpenChange={handleOpenChange}
        dropdownRender={() => (
          <div className="bg-white p-4 shadow-md w-full rounded-md w-64">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="text-blue-500">Min: {range[0]}</span>
              <span className="text-blue-500">Max: {range[1]}</span>
            </div>

            <Slider
              range
              min={min}
              max={max}
              value={range}
              onChange={onChange}
            />
          </div>
        )}
      >
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between w-full p-5 text-blue-500"
        >
          <span>{label}</span>
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
}