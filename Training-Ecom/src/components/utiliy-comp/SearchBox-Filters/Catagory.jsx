import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

export default function Catagory({ props }) {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    

    const handleMenuClick = (e) => {
        setSelectedKeys(e.selectedKeys);
        props.setSelectedKeysHandler(e.selectedKeys);
    };

    const items = props.items;

    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpen(nextOpen);

        }
    };

    return (
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
            <a onClick={e => e.preventDefault()}>
                <Space>
                    Catagories
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
}