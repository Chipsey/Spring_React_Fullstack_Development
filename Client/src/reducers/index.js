import { combineReducers } from "redux";
import auth from "./auth";
import products from "./product";
import singleProduct from "./singleProduct";
import fetchUsers from "./fetchUsers";
import order from "./order";

export default combineReducers({
  auth,
  products,
  singleProduct,
  fetchUsers,
  order,
});
