import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  Space,
  Anchor,
  Stack,
  Title,
  Center,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Check, Lock, Mail, X } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { showNotification, updateNotification } from "@mantine/notifications";

import { login } from "../features/auth/auth.slice";

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const { email, password } = form.values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      showNotification({
        id: "login",
        loading: true,
      });
    }

    if (isError) {
      updateNotification({
        id: "login",
        color: "red",
        title: message,
        icon: <X />,
      });
    }

    if (isSuccess || user) {
      updateNotification({
        id: "login",
        color: "green",
        title: "Logged in successfully",
        icon: <Check />,
      });
      navigate("/");
    }
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <Box sx={{ width: 500 }} mx="xl" mt="xl">
      <Paper shadow="xl" p="md" withBorder>
        <Title order={2}>LOGIN</Title>
        <Space h="md" />
        <form onSubmit={onSubmit}>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            icon={<Mail size={16} />}
            size="md"
            {...form.getInputProps("email")}
          />
          <Space h="sm" />
          <PasswordInput
            placeholder="Enter your password"
            label="Password"
            icon={<Lock size={16} />}
            size="md"
            {...form.getInputProps("password")}
            required
          />
          <div>
            <Stack mt="xl" align="stretch" justify="center" spacing="lg">
              <Button
                type="submit"
                size="md"
                disabled={isLoading ? true : false}
              >
                Login
              </Button>
              <Center>
                <Anchor component={Link} to="/register" size="xs">
                  Don't have an account? Register
                </Anchor>
              </Center>
            </Stack>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
export default LoginForm;
