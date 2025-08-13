// import { getToken } from "@/utils/auth";
import { getToken } from "@/utils/auth";
import axios, { AxiosError } from "axios";

// Create the Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// GET request
export const get = async (url: string) => {
  const token = getToken();
  try {
    const response = await API.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data };
  } catch (e) {
    const err = e as AxiosError;
    return {
      error: err.response?.data || err.message || "Something went wrong!",
    };
  }
};

// POST request
export const post = async (url: string, body: any) => {
  try {
    const response = await API.post(url, body);
    return { data: response.data };
  } catch (e) {
    const err = e as AxiosError;
    return {
      error: err.response?.data || err.message || "Something went wrong!",
    };
  }
};
// PUT request (for editing/updating data)
export const put = async (url: string, body: any) => {
  try {
    const response = await API.put(url, body);
    return { data: response.data };
  } catch (e) {
    const err = e as AxiosError;
    return {
      error: err.response?.data || err.message || "Something went wrong!",
    };
  }
};
