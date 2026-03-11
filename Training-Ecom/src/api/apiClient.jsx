import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.escuelajs.co/api/v1";

const buildQuery = (params) => {
  if (!params) return "";
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};

const request = async (endpoint, options = {}) => {
  const { params, body, headers, method = "GET" } = options;

  const token = localStorage.getItem("token");

  const url = `${BASE_URL}${endpoint}${buildQuery(params)}`;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
};

export const api = {
  get: (endpoint, params) =>
    request(endpoint, {
      method: "GET",
      params,
    }),

  post: (endpoint, body, params) =>
    request(endpoint, {
      method: "POST",
      body,
      params,
    }),

  put: (endpoint, body, params) =>
    request(endpoint, {
      method: "PUT",
      body,
      params,
    }),

  patch: (endpoint, body, params) =>
    request(endpoint, {
      method: "PATCH",
      body,
      params,
    }),

  delete: (endpoint, params) =>
    request(endpoint, {
      method: "DELETE",
      params,
    }),
};

