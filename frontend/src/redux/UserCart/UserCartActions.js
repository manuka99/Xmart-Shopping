import Api from "../../util/Api";
import {
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  FETCH_CART_REQUEST,
} from "./UserCartActionTypes";

export const fetch_cart_data_success = (cartData) => {
  return {
    type: FETCH_CART_SUCCESS,
    payload: cartData,
  };
};

export const fetch_cart_data_error = (error) => {
  return {
    type: FETCH_CART_ERROR,
    payload: error,
  };
};

export const fetch_cart_data_request = () => {
  return {
    type: FETCH_CART_REQUEST,
  };
};

//side effects
export const fetch_cart_data = () => {
  return (dispatch) => {
    dispatch(fetch_cart_data_request());
    Api()
      .get("/cart")
      .then((res) => {
        dispatch(fetch_cart_data_success(res.data));
      })
      .catch((error) => {
        dispatch(fetch_cart_data_success({}));
        dispatch(fetch_cart_data_error(error));
      });
  };
};
