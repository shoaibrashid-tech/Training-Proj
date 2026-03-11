import { api } from "../api/apiClient";
import { API_ENDPOINTS } from "../api/endpoints";
import { graphqlRequest } from "../api/graphglCleint";


export const getProducts = (params) => {
  return api.get(API_ENDPOINTS.PRODUCTS, params);
};

export const getProductbyId = (id) => {
    return api.get(API_ENDPOINTS.PRODUCT_BY_ID(id))
};

export const getCategories = () => {
  return api.get(API_ENDPOINTS.CATEGORIES);
};

export const addProductGraphQL = (data) => {
  const mutation = `
    mutation AddProduct($title: String!, $price: Float!, $description: String!, $categoryId: Float!, $images: [String!]!) {
      addProduct(
        data: {
          title: $title
          price: $price
          description: $description
          categoryId: $categoryId
          images: $images
        }
      ) {
        id
        title
        price
        images
        category {
          id
          name
        }
      }
    }
  `;

  return graphqlRequest(mutation, data);
};