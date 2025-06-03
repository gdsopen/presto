import { useAtom, useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { login, userId } from "../api/client";
import { authTokenAtom } from "../lib/Atoms";

type LoginValidationResult = {
  isValid: boolean;
  error: string | null;
};

type UserData = {
  login: string;
  name: string;
  role: string;
};

const COOKIE_NAME = "admin_token";

export const useLoginValidation = (): {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  isInitialized: boolean;
  validateLogin: (
    id: string,
    password: string,
  ) => Promise<LoginValidationResult>;
  logout: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useAtom(authTokenAtom);
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateLogin = async (
    id: string,
    password: string,
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
        secure: true, // HTTPSのみ
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
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const cookieToken = Cookies.get(COOKIE_NAME);
        if (cookieToken) {
          const userData = await userId(cookieToken);
          if (isMounted && userData.data?.login) {
            setUser({
              login: userData.data.login,
              name: userData.data.name || "",
              role: userData.data.role || "",
            });
            setToken({ token: cookieToken, loading: false });
            setIsAuthenticated(true);
          }
        } else if (isMounted) {
          setUser(null);
          setToken({ token: "", loading: false });
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setUser(null);
          setToken({ token: "", loading: false });
          setIsAuthenticated(false);
          Cookies.remove(COOKIE_NAME);
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    if (!isInitialized) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [isInitialized, setToken]);

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
    user,
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
