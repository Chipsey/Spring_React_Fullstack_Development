// src/reducers/productReducer.js

// Initial state for a single product
const initialState = {
  id: "",
  description: "",
  category: "",
  gender: "",
  price: 0,
  supplier: "",
  likes: 0,
};


const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_BY_ID":
      return action.payload; 
    default:
      return state;
  }
};

export default singleProduct;
