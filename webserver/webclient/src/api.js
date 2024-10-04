import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/api`,
});

export const getAccounts = () => api.get("/accounts");
export const getAccountById = (id) => api.get(`/accounts/${id}`);
export const createAccount = (account) => api.post("/accounts", account);
export const updateAccount = (id, account) =>
  api.put(`/accounts/${id}`, account);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);
export const loginAccount = (account) => api.post("/accounts/login", account);

export const getPosts = () => api.get("/posts");
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (account) => api.post("/posts", account);
export const updatePost = (id, account) => api.put(`/posts/${id}`, account);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const getProducts = () => api.get("/product");
export const getProductById = (id) => api.get(`/product/${id}`);
export const createProduct = (product) => api.post("/product", product);
export const updateProduct = (id, product) =>
  api.put(`/product/${id}`, product);
export const deleteProduct = (id) => api.delete(`/product/${id}`);

export const getActiveCartByAccountId = (id) => api.get(`/account/${id}/cart`);
export const addItemToAccountCart = (id, cart) =>
  api.post(`/account/${id}/cart`, cart);
export const updateAccountCart = (id, cart) =>
  api.post(`/account/${id}/cart`, cart);
export const deleteItemInAccountCart = (id, item_id) =>
  api.delete(`/account/${id}/cart/${item_id}`);
