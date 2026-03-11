import React from "react";
import { List, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function InfiniteList({
  queryKey,
  queryFn,
  renderItem,
  height = 500,
}) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const items = data?.pages?.flat() || [];

  if (status === "pending") {
    return <Skeleton active avatar paragraph={{ rows: 3 }} />;
  }

  return (
    <div
      id="scrollableDiv"
      className="h-[500px] overflow-auto px-4 border border-gray-300 rounded"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>No more items</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={items}
          renderItem={renderItem}
        />
      </InfiniteScroll>
    </div>
  );
}