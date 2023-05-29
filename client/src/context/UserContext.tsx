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

export interface User {
  email: string;
  password: string;
}
interface UserContext {
  user: User;
  loginUser: (user: User) => void;
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  user: { email: "", password: "" },
  loginUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User>({ email: "", password: "" });

  async function fetchLoginUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "lundell.linus@gmail.com",
          password: "12345",
        }),
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
        value={{ user: loginUser, loginUser: fetchLoginUser }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
