const Products = (state = [], action) => {
  switch (action.type) {
    case "DELETE":
      return state.filter((product) => product.id !== action.payload);

    case "UPDATE":
    case "LIKE":
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );

    case "FETCH_PRODUCTS":
      return action.payload;

    case "CREATE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default Products;
