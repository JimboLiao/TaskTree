import { createContext, useContext, useState } from "react";
import {
  getUserProfileApi,
  googleLoginApi,
  loginApi,
  logoutApi,
  signupApi,
} from "../api/userAPI";
import { User } from "../../../config/type";

interface UserContextType {
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<string>;
  getUser: () => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      setUser(data);
    } catch (err) {
      console.error(err);
      throw Error("login error");
    }
  };

  const googleLogin = async () => {
    try {
      const response = await googleLoginApi();
      return response.url;
    } catch (err) {
      console.error(err);
      throw Error("Google login error");
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await signupApi(email, password);
    } catch (err) {
      console.error(err);
      throw Error("signup error");
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async () => {
    try {
      const data = await getUserProfileApi();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, signup, logout, googleLogin, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUserContext(): UserContextType {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}

export { useUserContext, UserContext, UserProvider };
