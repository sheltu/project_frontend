import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Space,
  Anchor,
  Text,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Check, Lock, Mail, X } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { register, reset } from "../features/auth/auth.slice";

const Register = () => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          value
        )
          ? null
          : "Invalid pass",
      confirm_password: (value) =>
        value === form.values.password ? null : "Password doesn't match",
    },
  });

  const { email, password, confirmPassword } = form.values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      showNotification({
        id: "register",
        loading: true,
        disallowClose: true,
      });
    }

    if (isError) {
      updateNotification({
        id: "register",
        color: "red",
        title: "Error",
        message,
        icon: <X />,
      });
    }

    if (isSuccess || user) {
      updateNotification({
        id: "register",
        color: "green",
        title: "Successfully registered!",
        message: "Logging you in...",
        icon: <Check />,
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      confirmPassword,
    };

    dispatch(register(userData));
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Text size="xl">SIGN UP</Text>
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
          description="Password must include at least one uppercase letter, lowercase letter, number and special character with minimum 6 characters"
          icon={<Lock size={16} />}
          size="xs"
          {...form.getInputProps("password")}
          required
        />
        <Space h="sm" />
        <PasswordInput
          placeholder="Re-enter password"
          label="Confirm Password"
          icon={<Lock size={16} />}
          size="xs"
          {...form.getInputProps("confirmPassword")}
          required
        />
        <Checkbox
          mt="md"
          size="xs"
          label="Accept Terms & Conditions"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
        <div>
          <Group mt="md" position="right">
            <Anchor
              position="left"
              component={Link}
              to="/login"
              color="dark"
              size="xs"
            >
              Have an account? Login
            </Anchor>
            <Button position="right" type="submit" color="dark" size="xs">
              Register
            </Button>
          </Group>
        </div>
      </form>
    </Box>
  );
};

export default Register;
