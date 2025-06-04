import createClient from "openapi-fetch";
import type { components, paths } from "./generated/types";

const endpoint = import.meta.env.VITE_PUBLIC_ENDPOINT;

const client = createClient<paths>({ baseUrl: endpoint });

export const login = (login: string, password: string) =>
  client.POST("/accounts/login", {
    body: {
      login: login,
      password: password,
    },
  });

export const userId = async (token: string) => {
  try {
    const res = await client.GET("/accounts/info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to fetch user data: ${e}`);
  }
};

export const getUserData = async (token: string) => {
  try {
    const res = await userId(token);
    return res?.data?.login;
  } catch (e) {
    throw new Error(`getUserData error: ${e}`);
  }
};
export const getAllUsers = async (token: string) => {
  try {
    const res = await client.GET("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to fetch all users: ${e}`);
  }
};

export const updateUser = async (
  token: string,
  data: components["schemas"]["UpdateUser"]
) => {
  try {
    const res = await client.PUT("/admin/update", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to update user: ${e}`);
  }
};

export const updateOtherUser = async (
  token: string,
  data: components["schemas"]["UpdateOtherUser"]
) => {
  try {
    const res = await client.PUT("/admin/update", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to update other user: ${e}`);
  }
};

export const signUp = async (
  token: string,
  data: components["schemas"]["CreateUserFromAdmin"]
) => {
  try {
    const res = await client.POST("/admin/signup", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to sign up: ${e}`);
  }
};
