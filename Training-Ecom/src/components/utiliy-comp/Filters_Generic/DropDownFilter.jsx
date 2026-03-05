import React, { useState, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

export default function DropDownFilter({ items, selectedKeys, setSelectedKeys }) {
    const [open, setOpen] = useState(false);
    const debounceRef = useRef(null);

    const handleMenuClick = (e) => {
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setSelectedKeys(e.selectedKeys);
        }, 400); // debounce delay
    };

    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpen(nextOpen);
        }
    };

    return (
        <div className="h-10 w-full flex justify-center items-center border-2 border-blue-500 rounded-md">
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    multiple: true,
                    selectedKeys: selectedKeys,
                    onSelect: handleMenuClick,
                    onDeselect: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
            >
                <a
                    onClick={e => e.preventDefault()}
                    className="flex items-center justify-between w-full p-5 text-blue-500"
                >
                    <span>Category</span>
                    <DownOutlined />
                </a>
            </Dropdown>
        </div>
    );
}