import React, { useState } from "react";
import { List, Avatar, message, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import PaginatedList from "../../components/PaginatedList";
import { getProducts, addProduct, getCategories, removeProduct } from "../../services/ProductService";

import SearchFilter from "../../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../../components/utiliy-comp/Filters_Generic/RangeFilter";
import PrimaryButton from "../../components/utiliy-comp/PrimaryButton";
import AddProductFormModal from "../../components/Modals/AddProductFormModal";

export default function ProductAdmin() {
  const min = 10;
  const max = 1000;
  const limit = 48;
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [range, setRange] = useState([min, max]);

  const [addingProduct, setAddingProduct] = useState(false);
  const [formError, setFormError] = useState(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  const queryParams = {
    offset: (page - 1) * limit,
    limit: limit,
    title: filter || undefined,
    price_min: range[0],
    price_max: range[1],
    categoryId: selectedCategory || undefined,
  };

  const currentQueryKey = ["products", page, filter, range, selectedCategory];

  const { mutate: addProductHandle, isPending: addloading } = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      message.success("Product added successfully");
      queryClient.setQueryData(currentQueryKey, (old = []) => [newProduct, ...old]);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setAddingProduct(false);
      toast.success("Successfully Added Product");
    },
    onError: (err) => {
      setFormError(err?.message || "Failed to add product.");
      message.error("Failed to add product");
    }
  });

  const removeProductHandle = useMutation({
    mutationFn: removeProduct,
    onMutate: async (productID) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousData = queryClient.getQueryData(currentQueryKey);
      queryClient.setQueriesData(
        { queryKey: ["products"], exact: false },
        (old) => (old ? old.filter((p) => p.id !== productID) : [])
      );
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(currentQueryKey, context.previousData);
      }
      message.error("Delete Failed");
    },
    onSuccess: () => {
      toast.success("Deleted Successfully");
    },
  });

  const handleSearch = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleRangeChange = (value) => {
    setRange(value);
    setPage(1);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
    setPage(1);
  };

  return (
    // Responsive padding: p-2 on mobile, p-4 on md screens and up
    <div className="flex flex-col h-full w-full p-2 md:p-4 space-y-4 overflow-hidden">
      
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-3 md:p-4 rounded-lg shadow-md shrink-0">
        <div className="w-full md:w-2/8">
          <DropDownFilter
            items={categories}
            selectedKey={selectedCategory}
            setSelectedKey={handleCategoryChange}
          />
        </div>
        <div className="w-full md:w-2/8">
          <RangeFilter
            label="Price"
            min={min}
            max={max}
            range={range}
            setRangeHandle={handleRangeChange}
          />
        </div>
        <div className="w-full md:w-3/8">
          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
          />
        </div>
        <div className="w-full md:w-1/8">
          <PrimaryButton
            buttonText="Add New Product"
            onClickHandler={() => setAddingProduct(true)}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full overflow-hidden bg-white rounded-lg shadow-sm">
        <PaginatedList
          queryKey={currentQueryKey}
          queryFn={() => getProducts(queryParams)}
          currentPage={page}
          onPageChange={setPage}
          pageSize={limit}
          renderItem={(product) => (
            <List.Item
              key={product.id}
              className="hover:bg-gray-50 transition-colors px-2 md:px-4 py-3"
              actions={[
                <Popconfirm
                  title="Delete Product?"
                  onConfirm={() => removeProductHandle.mutate(product.id)}
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                >
                  <span className="text-red-500 cursor-pointer font-medium hover:text-red-700">
                    Delete
                  </span>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={product.images?.[0]} shape="square" size={48} className="border shadow-sm" />}
                title={<span className="font-semibold text-gray-800 text-sm md:text-base">{product.title}</span>}
                description={
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="text-green-600 font-bold">${product.price}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">ID: {product.id}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {addingProduct && (
        <AddProductFormModal
          open={addingProduct}
          setOpen={setAddingProduct}
          categories={categories}
          onConfirm={addProductHandle}
          confirmLoading={addloading}
          error={formError}
        />
      )}
    </div>
  );
}