import axios from "axios";
import * as config from "../../config";
import { store } from "../../store";
import { push } from "react-router-redux";

axios.defaults.baseURL = config.API_BASE_URL;
export const makeGetReqSpecmatic = url =>
  axios
    .get(url, {
      baseURL: config.API_BASE_URL
//      baseURL: config.API_URL_2
//      baseURL: config.SPECMATIC_BASE_URL
    })
    .then(res => res)
    .catch(error => {
        throw error;
    });
export const makeGetReq = url =>
  axios
    .get(url)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const makePostReq = params =>
  axios
    .post(params.url, params.data)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const makeDeleteReq = url =>
  axios
    .delete(url)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const makePatchReq = params =>
  axios
    .patch(params.url, params.data)
    .then(res => res)
    .catch(error => {
      throw error;
    });
const action = type => store.dispatch({ type });
export const logOut = () => {
  localStorage.removeItem("authToken");
  action("USER_LOGOUT");
  store.dispatch(push("/login"));
};
