import React, { useState } from "react";
import { List, Avatar, message } from "antd";

import InfiniteList from "../../components/InfiniteList";
import { getProducts, addProductGraphQL, getCategories } from "../../services/ProductService";

import SearchFilter from "../../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../../components/utiliy-comp/Filters_Generic/RangeFilter";
import PrimaryButton from "../../components/utiliy-comp/PrimaryButton";

import AddProductFormModal from "../../components/Modals/AddProductFormModal";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export default function ProductAdmin() {

  const min = 10;
  const max = 30000;

  const queryClient = useQueryClient();


  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [range, setRange] = useState([min, max]);

  const [addingProduct, setAddingProduct] = useState(false);
  const [formError, setFormError] = useState(null);

  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
  queryKey: ["categories"],
  queryFn: getCategories
  });

  // ---------------- TanStack Mutation (GraphQL) ----------------

  const { mutate: addProduct, isPending: loading } = useMutation({
    mutationFn: addProductGraphQL,

    onSuccess: () => {

      message.success("Product added successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"]
      });

      setAddingProduct(false);

    },

    onError: (err) => {

      console.error(err);

      setFormError(
        err?.message || "Failed to add product. Please try again."
      );

      message.error("Failed to add product");

    }
  });

  // ---------------- Filters ----------------

  const handleSearch = (value) => {
    setFilter(value);
  };

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
  };

  // ---------------- Add Product ----------------

  const handleAddProduct = (productData) => {

    setFormError(null);

    addProduct(productData);

  };

  // ---------------- Filters Object ----------------

  const filters = {
    search: filter,
    category: selectedCategory,
    minPrice: range[0],
    maxPrice: range[1]
  };

  return (
    <div>

      {/* ---------- Filters ---------- */}

      <div className="w-full h-20 flex justify-between items-center">

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

        <div className="w-1/4 px-2">
          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
          />
        </div>

        <div className="w-1/4 px-2">
          <PrimaryButton
            buttonText="Add New Product"
            onClickHandler={() => setAddingProduct(true)}
          />
        </div>

      </div>

      {/* ---------- Product List ---------- */}

      <div className="w-full h-[calc(100vh-120px)] overflow-auto">

        <InfiniteList
          queryKey={[
            "products",
            filters.search,
            filters.category,
            filters.minPrice,
            filters.maxPrice
          ]}
          queryFn={({ pageParam = 0 }) =>
            getProducts({
              page: pageParam,
              ...filters
            })
          }
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

      {/* ---------- Add Product Modal ---------- */}

      {addingProduct && (
        <AddProductFormModal
          open={addingProduct}
          setOpen={setAddingProduct}
          categories={categories}
          onConfirm={handleAddProduct}
          confirmLoading={loading}
          error={formError}
        />
      )}

    </div>
  );
}