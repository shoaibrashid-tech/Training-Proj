import { api } from "../api/apiClient";
import { API_ENDPOINTS } from "../api/endpoints";

export const getProducts = (params) => {
  return api.get(API_ENDPOINTS.PRODUCTS, params);
};

export const getProductbyId = (id) => {
    return api.get(API_ENDPOINTS.PRODUCT_BY_ID(id))
}