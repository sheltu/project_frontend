import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Space,
  Anchor,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Check, Lock, Mail, X } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { showNotification, updateNotification } from "@mantine/notifications";

import { login } from "../features/auth/auth.slice";

const Login = () => {
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
        title: "Error",
        message,
        icon: <X />,
      });
    }

    if (isSuccess || user) {
      updateNotification({
        id: "login",
        color: "green",
        title: "Logged in successfully",
        message: "Redirecting to your home page...",
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
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Text size="xl">Login</Text>
      <Space h="xs" />
      <form onSubmit={onSubmit}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          icon={<Mail size={16} />}
          size="xs"
          {...form.getInputProps("email")}
        />
        <Space h="sm" />
        <PasswordInput
          placeholder="Enter the password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          icon={<Lock size={16} />}
          size="xs"
          {...form.getInputProps("password")}
          required
        />
        <div>
          <Group mt="md" position="right">
            <Anchor
              position="left"
              component={Link}
              to="/register"
              color="dark"
              size="xs"
            >
              Don't have an account? Register
            </Anchor>
            <Button position="right" type="submit" color="dark" size="xs">
              Login
            </Button>
          </Group>
        </div>
      </form>
    </Box>
  );
};
export default Login;
