import React from "react";
import { List, Avatar } from "antd";
import InfiniteList from "../../components/InfiniteList";
import { getProducts } from "../../services/ProductService";

export default function ProductAdmin() {

  return (
    <InfiniteList
      queryKey={["products"]}
      queryFn={getProducts}
      renderItem={(product) => (
        <List.Item key={product.id}>
          <List.Item.Meta
            avatar={<Avatar src={product.images?.[0]} />}
            title={product.title}
            description={`$${product.price}`}
          />
        </List.Item>
      )}
    />
  );
}