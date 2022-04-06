import { Card, Text, Button, Group, useMantineTheme, Box } from "@mantine/core";

const VerifyMail = () => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Box sx={{ width: 500 }} mx="xl">
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>Confirm your email address</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          Verification email has been sent to the registered mail id. Verify and
          click next to continue.
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Resend email
        </Button>
      </Card>
    </Box>
  );
};

export default VerifyMail;
