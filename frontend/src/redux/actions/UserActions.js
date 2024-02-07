import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_INTERESTS_FAIL,
  USER_UPDATE_INTERESTS_REQUEST,
  USER_UPDATE_INTERESTS_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  GET_SUGGESTED_USERS_REQUEST,
  GET_SUGGESTED_USERS_SUCCESS,
  GET_SUGGESTED_USERS_FAIL
} from "../constants/UserConstants.js";
import { URL } from "../Url";

// LOGIN
export const login = (email, password, phone, name, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const { data } = await axios.post(
      `${URL}/api/users/login`,
      { email, password, phone, name },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    await dispatch(getUserDetails(data.id));
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate(`/dashboard/${data.id}`);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const userInfoFromStorage = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {};

    const token = userInfoFromStorage?.token;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/users/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    return data
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// LOGOUT
export const logout = (navigate) => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  navigate("/");
};

// REGISTER
export const register = (name, email, password, phone, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
      },
    };
    const { data } = await axios.post(
      `${URL}/api/users`,
      { name, email, password, phone },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch(getUserDetails(data.id));
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/verification");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// VERIFY
export const verify = (email, phone, code, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users/verify`,
      { email, phone, code },
      config
    );

    dispatch({ type: USER_VERIFY_SUCCESS });

    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails(data.id));
    navigate(`/dashboard/${data.id}`);
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GOOGLE REGISTER
export const loginWithGoogle = (token,navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await axios.post(`${URL}/api/users/google`, { token }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails(data.id));
    navigate(`/dashboard/${data.id}`)
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// FACEBOOK REGISTER
export const loginWithFacebook = (userID, accessToken, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await axios.post(`${URL}/api/users/facebook`, { userID, accessToken }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails(data.id));
    navigate(`/dashboard/${data.id}`)
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// UPDATE USER INTERESTS
export const updateUserInterests = (id, interests) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_INTERESTS_REQUEST });

    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {};

    const token = userInfo.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/users/${id}/interests`,
      { interests },
      config
    );

    dispatch({ type: USER_UPDATE_INTERESTS_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data }); // Update the user details in the state

    // Update the local storage with the new user data
    const updatedUserInfo = {
      ...userInfo,
      ...data,
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

  } catch (error) {
    dispatch({
      type: USER_UPDATE_INTERESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSuggestedUsers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUGGESTED_USERS_REQUEST });

    const { data } = await axios.get(`${URL}/api/users/suggestedUsers`, {
      params: {
        userId: userId,
      }
    });

    dispatch({ type: GET_SUGGESTED_USERS_SUCCESS, payload: data });
    return data
  } catch (error) {
    dispatch({
      type: GET_SUGGESTED_USERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
}