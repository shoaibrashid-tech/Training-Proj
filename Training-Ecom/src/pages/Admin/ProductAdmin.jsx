import React, { useState } from "react";
import { List, Avatar, message } from "antd";

import { toast } from "react-toastify";

import InfiniteList from "../../components/InfiniteList";
import { getProducts, addProduct, getCategories, removeProduct } from "../../services/ProductService";

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

  const { mutate: addProductHandle, isPending: addloading } = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {

      message.success("Product added successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"]
      });

      setAddingProduct(false);
      toast.success("Successfully Added Product");

    },

    onError: (err) => {

      console.error(err);

      setFormError(
        err?.message || "Failed to add product. Please try again."
      );

      message.error("Failed to add product");

    }
  });


  const removeProductHandle = useMutation({
    mutationFn: removeProduct,

    onMutate: async (productID) => {

      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueriesData({
        queryKey: ["products"]
      });

      queryClient.setQueriesData(
        { queryKey: ["products"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) =>
              page.filter((p) => p.id !== productID)
            ),
          };
        }
      );

      return { previousProducts };
    },

    onError: (error, variables, context) => {

      if (!context) return;

      context.previousProducts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      message.error("Delete Failed");
      toast.error("Delete Failed");
    },

    onSuccess: () => {
      toast.success("Deleted Successfully");
    },

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

    addProductHandle(productData);

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
            <List.Item
                key={product.id}
                actions={[
                  <span
                    key="delete"
                    onClick={() => removeProductHandle.mutate(product.id)}
                    className="text-red-600 underline cursor-pointer hover:text-red-800"
                  >
                    Delete
                  </span>
                ]}
              >
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
          confirmLoading={addloading}
          error={formError}
        />
      )}

    </div>
  );
}