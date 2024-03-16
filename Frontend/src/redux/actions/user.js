import axios from "axios";

import baseUrl from "../../baseUrl.js";

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    console.log("API URL:", `${baseUrl}/user/get-user`); // Log the API URL


    const { data } = await axios.get(`${baseUrl}/user/get-user`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {

    // Check if error.response exists before accessing data property
    const errorMessage = error.response ? error.response.data.message : 'Unknown error';

    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};


export const LoadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${baseUrl}/shop/get-seller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

