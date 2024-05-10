import { createContext, useContext, useState } from "react";
import { User, loginApi, signupApi } from "../api/userAPI";

interface UserContextType {
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      document.cookie = `token=${response.token}; path=/; Secure; SameSite=Strict`;
      setUser(response.user);
    } catch (err) {
      console.error(err);
      throw Error("login error");
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

  const logout = () => {
    //remove token
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict";
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
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
