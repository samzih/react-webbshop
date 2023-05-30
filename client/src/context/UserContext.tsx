/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

export interface Credentials {
  email: string;
  password: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserContext {
  loginUser: User | null;
  fetchLoginUser: (user: Credentials) => void;
  logoutUser: (user: User) => void;
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  loginUser: null,
  fetchLoginUser: () => {},
  logoutUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

  //reminder: useEffect for auth

  async function fetchLoginUser(user: Credentials) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setLoginUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser(user: User) {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setLoginUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(loginUser);
  }, [loginUser]);

  return (
    <div>
      <UserContext.Provider
        value={{
          logoutUser,
          loginUser,
          fetchLoginUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
