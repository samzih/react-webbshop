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
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  loginUser: null,
  fetchLoginUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

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

  useEffect(() => {
    console.log(loginUser);
  }, [loginUser]);

  return (
    <div>
      <UserContext.Provider
        value={{
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
