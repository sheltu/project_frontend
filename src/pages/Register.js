import { Center } from "@mantine/core";

import RegisterForm from "../components/RegisterForm";
import AuthNavbar from "../components/AuthNavbar";

const Register = () => {
  return (
    <>
      <AuthNavbar>
        <Center sx={{ height: "100%" }}>
          <RegisterForm />
        </Center>
      </AuthNavbar>
    </>
  );
};
export default Register;
