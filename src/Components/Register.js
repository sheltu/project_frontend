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
import { useForm } from "@mantine/form";
import { Lock, Mail } from "tabler-icons-react";
import { Link } from "react-router-dom";

function Register() {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
      password: "",
      confirm_password: "",
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

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Text size="sm">Register</Text>
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
          {...form.getInputProps("confirm_password")}
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
              to="/"
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
}

export default Register;
