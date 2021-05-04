import {
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  FETCH_CART_REQUEST,
} from "./UserCartActionTypes";

const initialState = {};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
      return {
        ...action.payload,
      };
    case FETCH_CART_ERROR:
      return {
        ...action.payload,
      };
    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
