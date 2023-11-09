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
export const fetchUsers = () =>
  API.get("http://localhost:8080/api/v1/auth/fetch-users");
export const deleteUser = (id) =>
  API.delete(`http://localhost:8080/api/v1/auth/delete-user/${id}`);
export const updateProfile = (id) =>
  API.put(`http://localhost:8080/api/v1/auth/update-profile/${id}`);

//Products
export const fetchProducts = () =>
  API.get("http://localhost:8081/api/v1/inventory/all");
export const fetchProductById = (id) =>
  API.get(`http://localhost:8081/api/v1/inventory/fetch/${id}`);
export const fetchColorsById = (id) =>
  API.get(`http://localhost:8080/products/colors/${id}`);
export const fetchSizesById = (id) =>
  API.get(`http://localhost:8080/products/sizes/${id}`);
export const deleteProduct = (id) =>
  API.delete(`http://localhost:8081/api/v1/inventory/delete/${id}`);
export const likeProduct = (id) =>
  API.patch(`http://localhost:8080/products/${id}/likePost`);
export const addProduct = (productData) =>
  API.post("http://localhost:8081/api/v1/inventory/add", productData);
export const updateProduct = (id, updatedProductData) =>
  API.put(`http://localhost:8080/products/update/${id}`, updatedProductData);
export const updateDetails = (id, updatedProductData) =>
  API.put(
    `http://localhost:8081/api/v1/inventory/update/${id}`,
    updatedProductData
  );
export const addDiscount = (id, discountData) =>
  API.post(`http://localhost:8080/products/addDscount/${id}`, discountData);

//Order
export const addOrder = (orderData) =>
  API.post("http://localhost:8082/api/v1/order/add", orderData);
export const fetchOrders = () =>
  API.get("http://localhost:8082/api/v1/order/all");
export const fetchOpenOrders = () =>
  API.get("http://localhost:8082/api/v1/order/open");
export const fetchOrderByEmail = (userEmail) =>
  API.get(`http://localhost:8082/api/v1/order/fetch-by-email/${userEmail}`);
export const fetchOrderByDeliverId = (id) =>
  API.get(`http://localhost:8082/api/v1/order/fetch-by-deliver-id/${id}`);
export const updateOrder = (id, updatedOrderData) =>
  API.put(`http://localhost:8082/api/v1/order/update/${id}`, updatedOrderData);
export const deleteOrder = (id) =>
  API.delete(`http://localhost:8082/api/v1/order/delete/${id}`);
