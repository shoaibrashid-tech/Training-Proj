import React from "react";
import { List, Avatar } from "antd";
import InfiniteList from "../../components/InfiniteList";
import { getProducts } from "../../services/ProductService";
import { useState } from "react";
import SearchFilter from "../../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../../components/utiliy-comp/Filters_Generic/RangeFilter";

export default function ProductAdmin() {

      const min = 10;
      const max = 30000;
    
      const [categories, setCategories] = useState([]);
    
      const [filter, setFilter] = useState("");
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [range, setRange] = useState([min, max]);
  const handleSearch = (value) => {
    setFilter(value);
  };

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
  };
  return (

    <div>

        <div className="w-full h-20 px-0 flex justify-between items-center">
        
                <div className="w-1/4 px-2">
                  <DropDownFilter
                    items={categories}
                    selectedKey={selectedCategory}
                    setSelectedKey={handleCategoryChange}
                  />
                </div>
        
                <div className="w-1/4 px-2">
                  <RangeFilter
                    label="Price"
                    min={min}
                    max={max}
                    range={range}
                    setRangeHandle={handleRangeChange}
                  />
                </div>
        
                <div className="w-2/4 px-2">
                  <SearchFilter
                    setStateToEdit={handleSearch}
                    searchText="Search"
                  />
                </div>
        
              </div>
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

    </div>
    
  );
}