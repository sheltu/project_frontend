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
  Center,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Check, Lock, Mail, X } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { register, reset } from "../features/auth/auth.slice";

const RegisterForm = () => {
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
        title: message,
        icon: <X />,
      });
    }

    if (isSuccess || user) {
      updateNotification({
        id: "register",
        color: "green",
        title: "Successfully registered!",
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
    <Box sx={{ width: 500 }} mx="xl" mt="xl">
      <Paper shadow="xl" p="md" withBorder>
        <Title order={2}>SIGN UP</Title>
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
            placeholder="Enter the password"
            label="Password"
            description="Password must include at least one uppercase letter, lowercase letter, number and special character with minimum 6 characters"
            icon={<Lock size={16} />}
            size="md"
            {...form.getInputProps("password")}
            required
          />
          <Space h="sm" />
          <PasswordInput
            placeholder="Re-enter password"
            label="Confirm Password"
            icon={<Lock size={16} />}
            size="md"
            {...form.getInputProps("confirmPassword")}
            required
          />
          <Checkbox
            mt="md"
            size="xs"
            label="I Accept the Terms & Conditions"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <div>
            <Stack mt="xl" align="stretch" justify="center" spacing="lg">
              <Button
                position="right"
                type="submit"
                size="md"
                disabled={form.values.termsOfService ? false : true}
              >
                Register
              </Button>
              <Center>
                <Anchor position="left" component={Link} to="/login" size="xs">
                  Have an account? Login
                </Anchor>
              </Center>
            </Stack>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
