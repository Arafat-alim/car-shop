import axios from "axios";

import { getbaseUrl } from "../utils/url";

const API_URL = getbaseUrl();

export const login = async (email: string, password: string) => {
  await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  window.location.reload();
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/me`, null, {
      withCredentials: true,
    });

    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
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
  } catch (err) {
    console.error("Logout failed", err);
  }
};
