/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useUserContext, User } from "../../context/UserContext";

type Props = {
  user: User;
};

function LoginButton() {
  const { user, loginUser } = useUserContext();
  return (
    <div>
      <Button onClick={() => loginUser(user)} type="primary">
        Login
      </Button>
    </div>
  );
}

export default LoginButton;
