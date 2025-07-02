import axios from "axios";

import { getbaseUrl } from "../utils/url";

const API_URL = getbaseUrl();

export const login = async (email: string, password: string) => {
  await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/refresh-token`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  document.cookie = "accessToken=; Max-Age=0; path=/";
  document.cookie = "refreshToken=; Max-Age=0; path=/";
};
