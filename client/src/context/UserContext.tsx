import { PropsWithChildren, useEffect, useState, createContext } from "react";

interface User {
  email: string;
  password: string;
}
interface UserContext {
  user: User;
  loginUser: (user: User) => void;
}
// Eventuellt lägga till Cart till userInterface

const UserContext = createContext<UserContext>({
  user: Object,
  loginUser: () => {},
});
const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loginUser, setLoginUser] = useState<User>({ email: "", password: "" });

  useEffect(() => {
    async function loginUser() {
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "cappew@live.se",
            password: "hejhejhej",
          }),
        });
        const data = await response.json();
        setLoginUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    loginUser();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, loginUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
