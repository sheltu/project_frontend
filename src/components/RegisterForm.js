import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  Space,
  Anchor,
  Center,
  Paper,
  Title,
  Stack,
  Progress,
  Text,
  Popover,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Check, Lock, Mail, X } from "tabler-icons-react";

import { register, reset } from "../features/auth/auth.slice";

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <Check /> : <X />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const RegisterForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
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
          : "Invalid password",
      confirmPassword: (value) =>
        value === form.values.password ? null : "Password doesn't match",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  const [popoverOpened, setPopoverOpened] = useState(false);

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

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));
  const strength = getStrength(form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  
  return (
    <Box sx={{ maxWidth: 500 }} mx="xl">
      <Paper shadow="xl" p="md" withBorder>
        <Title order={2}>SIGN UP</Title>
        <Space h="md" />
        <form onSubmit={form.onSubmit((values) => dispatch(register(values)))}>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            icon={<Mail size={16} />}
            size="md"
            {...form.getInputProps("email")}
          />
          <Space h="sm" />
          <Popover
            opened={popoverOpened}
            position="bottom"
            placement="start"
            withArrow
            styles={{ popover: { width: "100%" } }}
            trapFocus={false}
            transition="pop-top-left"
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
            target={
              <PasswordInput
                placeholder="Enter password"
                label="Password"
                description="Password must include at least one uppercase letter, lowercase letter, number and special character with minimum 6 characters"
                icon={<Lock size={16} />}
                size="md"
                {...form.getInputProps("password")}
                required
              />
            }
          >
            <Progress
              color={color}
              value={strength}
              size={5}
              style={{ marginBottom: 10 }}
            />
            <PasswordRequirement
              label="Includes at least 6 characters"
              meets={form.values.password.length > 5}
            />
            {checks}
          </Popover>
          <Space h="sm" />
          <PasswordInput
            placeholder="Re-enter password"
            label="Confirm Password"
            icon={<Lock size={16} />}
            size="md"
            {...form.getInputProps("confirmPassword")}
            required
          />
          <div>
            <Stack mt="xl" align="stretch" justify="center" spacing="lg">
              <Button position="right" type="submit" size="md">
                Register
              </Button>
              <Center>
                <Anchor position="left" component={Link} to="/login" size="sm">
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
