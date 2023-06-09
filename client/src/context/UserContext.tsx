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

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserContext {
  loginUser: User | null;
  fetchLoginUser: (user: Credentials) => Promise<string | void>;
  logoutUser: () => void;
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  loginUser: null,
  fetchLoginUser: async () => {},
  logoutUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  //reminder: useEffect for auth

  async function fetchLoginUser(user: Credentials): Promise<void> {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoginUser(data);
      }
      if (response.status === 401) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 204) {
        setLoginUser(null);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  // }, [loginUser]);

  useEffect(() => {
    async function authorizeUser() {
      try {
        if (loginUser) {
          // console.log("is logged in");
        } else {
          const response = await fetch("/api/users/authorize");
          if (response.status === 200) {
            // console.log("is logged in");
            const data = await response.json();
            setLoginUser(data);
          } else if (response.status === 401) {
            setLoginUser(null);
            // console.log("you are not logged in");
          } else {
            console.log("Unexpected response from server");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    authorizeUser();
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
