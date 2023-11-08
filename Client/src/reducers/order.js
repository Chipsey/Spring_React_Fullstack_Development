import {
  ADD_ORDER,
  DELETE_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER_BY_EMAIL,
  UPDATE_ORDER,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case FETCH_ORDER_BY_EMAIL:
      return {
        ...state,
        orders: action.payload,
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    default:
      return state;
  }
};

export default order;
