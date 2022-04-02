import { Center, Text } from "@mantine/core";

import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";

const Login = () => {
  return (
    <>
      <AuthNavbar />
      <Center mt="xl">
        <LoginForm />
      </Center>
      <Center mt="xl">
        <Text size="xs">Copyright &copy; 2022, GCETLY Students</Text>
      </Center>
    </>
  );
};
export default Login;
