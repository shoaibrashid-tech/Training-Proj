import api from "../api/axiosInstance";

// Get all products with optional filters
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", {
      params: params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error.response?.data || error.message);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw error;
  }
};

// Add new product
export const addProduct = async (data) => {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response?.data || error.message);
    throw error;
  }
};

// Delete product
export const removeProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    throw error;
  }
};