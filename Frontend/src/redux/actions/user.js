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


// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${baseUrl}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      let errorMessage;
      if (error.response && error.response.status === 400) {
        // User not found error
        errorMessage = "User not found";
      } else {
        // Other errors
        errorMessage = error.response.data.message || "An error occurred";
      }


      dispatch({
        type: "updateUserInfoFailed",
        payload: errorMessage,
        
      });
    }
  };

