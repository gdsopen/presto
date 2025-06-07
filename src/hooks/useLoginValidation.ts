import { useAtom, useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { login, userId } from "../api/client";
import { type UserData, authTokenAtom, userDataAtom } from "../lib/Atoms";

type LoginValidationResult = {
  isValid: boolean;
  error: string | null;
};

const COOKIE_NAME = "admin_token";

export const useLoginValidation = (): {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  isInitialized: boolean;
  validateLogin: (
    id: string,
    password: string
  ) => Promise<LoginValidationResult>;
  logout: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useAtom(authTokenAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateLogin = async (
    id: string,
    password: string
  ): Promise<LoginValidationResult> => {
    setIsLoading(true);
    try {
      const req = await login(id, password);
      if (req.error) {
        const errorData = await req.error;
        return {
          isValid: false,
          error: errorData || "Login Failed",
        };
      }
      const newToken = req.data?.token;
      if (!newToken) {
        return {
          isValid: false,
          error: "Failed to get token",
        };
      }
      Cookies.set(COOKIE_NAME, newToken, {
        expires: 7, // 7日間有効
        secure: window.location.protocol === "https:", // HTTPSの場合のみsecure
        sameSite: "strict", // CSRF対策
      });
      setToken({ token: newToken, loading: false });
      setIsAuthenticated(true);
      return {
        isValid: true,
        error: null,
      };
    } catch (error) {
      return {
        isValid: false,
        error: "An error occurred while logging in",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove(COOKIE_NAME);
    setToken({ token: "", loading: false });
    setUserData(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token.token) {
        setUserData(null);
        setIsInitialized(true);
        return;
      }

      try {
        const response = await userId(token.token);
        if (response.data) {
          setUserData(response.data as UserData);
        }
      } catch (error) {
        setUserData(null);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchUserData();
  }, [token.token, setUserData]);

  // Cookieの変更を監視
  useEffect(() => {
    const cookieToken = Cookies.get(COOKIE_NAME);
    if (cookieToken !== token.token) {
      setToken({ token: cookieToken || "", loading: false });
    }
  }, [token.token, setToken]);

  return {
    isLoading,
    isAuthenticated,
    user: userData,
    validateLogin,
    logout,
    isInitialized,
  };
};

export const useAuth = (): {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  isInitialized: boolean;
  logout: () => void;
} => {
  const token = useAtomValue(authTokenAtom);
  const { user, isInitialized, logout } = useLoginValidation();

  return {
    isAuthenticated: token.token !== "" && !token.loading,
    isLoading: token.loading,
    user,
    isInitialized,
    logout,
  };
};
