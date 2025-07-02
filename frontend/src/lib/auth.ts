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
    const response = await axios.post(`${API_URL}/auth/me`, null, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, null, {
      withCredentials: true,
    });

    // Optional: reload page or route
    window.location.reload();
  } catch (error) {
    console.error("Logout failed", error);
  }
};
