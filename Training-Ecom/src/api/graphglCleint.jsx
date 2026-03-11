const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL || "https://api.escuelajs.co/graphql";

export const graphqlRequest = async (query, variables = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
};