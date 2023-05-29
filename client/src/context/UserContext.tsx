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
  loginUser: User;
  fetchLoginUser: (user: User) => void;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  loginUser: { email: "", password: "" },
  fetchLoginUser: () => {},
  handleEmail: () => {},
  handlePassword: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User>({ email: "", password: "" });

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  }

  async function fetchLoginUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginUser.email, //"lundell.linus@gmail.com",
          password: loginUser.password, //"12345",
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
        value={{
          loginUser,
          fetchLoginUser,
          handleEmail,
          handlePassword,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
