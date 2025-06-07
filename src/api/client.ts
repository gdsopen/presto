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
  data: components["schemas"]["UpdateUser"],
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
  data: components["schemas"]["UpdateOtherUser"],
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
  data: components["schemas"]["CreateUserFromAdmin"],
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

export const getAllPNRs = async (token: string) => {
  try {
    // 検索で全てのPNRを取得（最小限の検索条件を使用）
    const res = await searchPassengerPNR(token, { firstName: "" });
    return res;
  } catch (e) {
    throw new Error(`Failed to fetch all PNRs: ${e}`);
  }
};

export const getPnrByName = async (token: string, firstName: string) => {
  try {
    const res = await searchPassengerPNR(token, { firstName });
    return res;
  } catch (e) {
    throw new Error(`Failed to fetch PNR by name: ${e}`);
  }
};

export const getPassengerPNR = async (token: string, id: string) => {
  try {
    const res = await client.GET("/pnr/passenger/{id}", {
      headers: { Authorization: `Bearer ${token}` },
      params: { path: { id } },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res.data;
  } catch (e) {
    throw new Error(`Failed to fetch passenger PNR: ${e}`);
  }
};

export const updatePassengerPNR = async (
  token: string,
  data: components["schemas"]["PassengerNameRecordUpdate"],
) => {
  try {
    const res = await client.PUT("/pnr/passenger", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to update passenger PNR: ${e}`);
  }
};

export const createPassengerPNR = async (
  token: string,
  data: components["schemas"]["PassengerNameRecord"],
) => {
  try {
    const res = await client.POST("/pnr/passenger", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to create passenger PNR: ${e}`);
  }
};

export const deletePassengerPNR = async (token: string, id: string) => {
  try {
    const res = await client.DELETE("/pnr/passenger", {
      headers: { Authorization: `Bearer ${token}` },
      body: { id },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to delete passenger PNR: ${e}`);
  }
};

export const searchPassengerPNR = async (
  token: string,
  data: components["schemas"]["Search"],
) => {
  try {
    const res = await client.POST("/pnr/passenger/search", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to search passenger PNR: ${e}`);
  }
};

export const updateFlightRecord = async (
  token: string,
  data: components["schemas"]["PassengerFlightRecordUpdate"],
) => {
  try {
    const res = await client.PUT("/pnr/flight", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to update flight record: ${e}`);
  }
};

export const createFlightRecord = async (
  token: string,
  data: components["schemas"]["PassengerFlightRecord"],
) => {
  try {
    const res = await client.POST("/pnr/flight", {
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to create flight record: ${e}`);
  }
};

export const deleteFlightRecord = async (token: string, id: string) => {
  try {
    const res = await client.DELETE("/pnr/flight", {
      headers: { Authorization: `Bearer ${token}` },
      body: { id },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to delete flight record: ${e}`);
  }
};

export const getFullPNRGov = async (token: string, pnrId: string) => {
  try {
    const res = await client.GET("/pnrgov/full/{pnrId}", {
      headers: { Authorization: `Bearer ${token}` },
      params: { path: { pnrId } },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get full PNR gov: ${e}`);
  }
};

export const getUpdatePNRGov = async (token: string, pnrId: string) => {
  try {
    const res = await client.GET("/pnrgov/update/{pnrId}", {
      headers: { Authorization: `Bearer ${token}` },
      params: { path: { pnrId } },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get update PNR gov: ${e}`);
  }
};

export const getAdhocPNRGov = async (token: string, pnrId: string) => {
  try {
    const res = await client.GET("/pnrgov/adhoc/{pnrId}", {
      headers: { Authorization: `Bearer ${token}` },
      params: { path: { pnrId } },
    });
    if (res.error) {
      throw new Error(`Error: ${res.error}`);
    }
    return res;
  } catch (e) {
    throw new Error(`Failed to get adhoc PNR gov: ${e}`);
  }
};
