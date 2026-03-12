import React, { useState, useEffect } from "react";
import { Popover, Slider, InputNumber } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { GrClear } from "react-icons/gr";

export default function RangeFilter({ label, min, max, range, setRangeHandle }) {
  const [open, setOpen] = useState(false);
  const [localRange, setLocalRange] = useState(range);

  useEffect(() => {
    setLocalRange(range);
  }, [range]);

  const onSliderChange = (value) => {
    setLocalRange(value);
  };

  const onAfterChange = (value) => {
    setRangeHandle(value);
  };

  const onInputChange = (val, index) => {
    const newRange = [...localRange];
    newRange[index] = val;
    setLocalRange(newRange);
    setRangeHandle(newRange);
  };


  return (
    <div className="h-10 w-full flex justify-center items-center border-2 border-blue-500 rounded-md bg-white">
      <Popover
        content={
          <div className="w-64 p-2">
            <div className="flex items-center justify-between gap-2 mb-4">
              <InputNumber
                min={min}
                max={localRange[1]}
                value={localRange[0]}
                onChange={(val) => onInputChange(val, 0)}
                prefix="$"
                size="small"
              />
              <span className="text-gray-400">-</span>
              <InputNumber
                min={localRange[0]}
                max={max}
                value={localRange[1]}
                onChange={(val) => onInputChange(val, 1)}
                prefix="$"
                size="small"
              />
            </div>

            <Slider
              range
              min={min}
              max={max}
              value={localRange}
              onChange={onSliderChange}
              onAfterChange={onAfterChange}
            />

            {(range[0] > min || range[1] < max) && (
              <div className="w-full pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setRangeHandle([min, max]);
                    setLocalRange([min, max]);
                  }}
                  className="inline-flex text-red-600 items-center gap-2 text-sm font-medium underline"
                >
                  Clear <GrClear />
                </button>
              </div>
            )}
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={(nextOpen) => setOpen(nextOpen)}
        placement="bottom"
      >
        <button
          className="flex items-center justify-between w-full px-4 text-blue-500 bg-transparent border-none cursor-pointer"
        >
          <span className="truncate">
            {(range[0] > min || range[1] < max) 
              ? `$${range[0]} - $${range[1]}` 
              : label}
          </span>
          <DownOutlined className="text-xs ml-2" />
        </button>
      </Popover>
    </div>
  );
}