import { Center, Text } from "@mantine/core";

import RegisterForm from "../components/RegisterForm";
import AuthNavbar from "../components/AuthNavbar";

const Register = () => {
  return (
    <>
      <AuthNavbar />
      <Center mt="xl">
        <RegisterForm />
      </Center>
      <Center mt="xl">
        <Text size="xs">Copyright &copy; 2022, GCETLY Students</Text>
      </Center>
    </>
  );
};
export default Register;
