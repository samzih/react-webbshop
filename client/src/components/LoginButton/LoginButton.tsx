/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useUserContext, User } from "../../context/UserContext";

type Props = {
  user: User;
};

function LoginButton() {
  const { loginUser, fetchLoginUser } = useUserContext();
  return (
    <div>
      <Button onClick={() => fetchLoginUser(loginUser)} type="primary">
        Login
      </Button>
    </div>
  );
}

export default LoginButton;
