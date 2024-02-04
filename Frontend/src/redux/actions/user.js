import axios from "axios";

import baseUrl from "../../baseUrl.js";

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${baseUrl}/user/get-user`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};
