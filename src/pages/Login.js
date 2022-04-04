import { Center, Text } from "@mantine/core";

import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";

const Login = () => {
  return (
    <>
      <AuthNavbar>
        <Center sx={{ height: "100%" }}>
          <LoginForm />
        </Center>
      </AuthNavbar>
    </>
  );
};
export default Login;
