import axios from "axios";

const API = axios.create();

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//Auth
export const signIn = (formData) =>
  API.post("http://localhost:8080/api/v1/auth/authenticate", formData);
export const signUp = (formData) =>
  API.post("http://localhost:8080/api/v1/auth/register", formData);
export const fetchUsers = () => API.get("http://localhost:8080/api/v1/auth/fetch-users");
export const deleteUser = (id) => API.get(`http://localhost:8080/api/v1/auth/delete-user/${id}`);
export const updateProfile = (id) => API.get(`http://localhost:8080/api/v1/auth/update-profile/${id}`);

//Products
export const fetchProducts = () => API.get("http://localhost:8080/api/v1/products");
export const fetchProductById = (id) =>
  API.get(`http://localhost:8080/products/${id}`);
export const fetchColorsById = (id) =>
  API.get(`http://localhost:8080/products/colors/${id}`);
export const fetchSizesById = (id) =>
  API.get(`http://localhost:8080/products/sizes/${id}`);
export const deleteProduct = (id) =>
  API.delete(`http://localhost:8080/products/${id}`);
export const likeProduct = (id) =>
  API.patch(`http://localhost:8080/products/${id}/likePost`);
export const addProduct = (productData) =>
  API.post("http://localhost:8080/products/add", productData);
export const updateProduct = (id, updatedProductData) =>
  API.put(`http://localhost:8080/products/update/${id}`, updatedProductData);
export const updateDetails = (id, updatedProductData) =>
  API.put(`http://localhost:8080/products/updateDetails/${id}`, updatedProductData);
export const addDiscount = (id, discountData) =>
  API.post(`http://localhost:8080/products/addDscount/${id}`, discountData);
