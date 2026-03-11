import { api } from "../api/apiClient";
import { API_ENDPOINTS } from "../api/endpoints";

export const getProducts = (params) => {
  return api.get(API_ENDPOINTS.PRODUCTS, params);
};

export const getProductbyId = (id) => {
  return api.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
};

export const getCategories = () => {
  return api.get(API_ENDPOINTS.CATEGORIES);
};

export const addProduct = (data) => {
  return api.post(API_ENDPOINTS.PRODUCTS, data);
};

export const removeProduct = (id) => {
  return api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
};