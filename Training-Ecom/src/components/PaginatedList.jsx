import React from "react";
import { List, Skeleton, Pagination, Divider } from "antd";
import { useQuery } from "@tanstack/react-query";

export default function PaginatedList({
  queryKey,
  queryFn,
  renderItem,
  currentPage,
  onPageChange,
  pageSize = 48,
  totalItems = 1000, // Sync this with your backend total
}) {
  const { data: items = [], isLoading, isFetching } = useQuery({
    queryKey,
    queryFn,
    // Keep data visible while fetching new pages for a smoother UI
    placeholderData: (previousData) => previousData, 
  });

  if (isLoading && items.length === 0) {
    return <Skeleton active avatar paragraph={{ rows: 5 }} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto px-4 border border-gray-200 rounded-lg bg-white">
        <List
          loading={isFetching}
          dataSource={items}
          renderItem={renderItem}
          locale={{ emptyText: "No products found matching your filters." }}
        />
        <Divider />
      </div>

      <div className="flex justify-center py-6 bg-gray-50 mt-2 rounded-lg border border-gray-200">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={onPageChange}
          showSizeChanger={false}
          align="center"
        />
      </div>
    </div>
  );
}