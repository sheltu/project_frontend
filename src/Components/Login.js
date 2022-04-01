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
import { Lock, Mail } from "tabler-icons-react";
import { Link } from "react-router-dom";

function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Text size="sm">Login</Text>
      <Space h="xs" />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
}
export default Login;
