import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Header,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

const AuthNavbar = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <AppShell
      fixed
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Title order={4}>ALUMNI STUDENTS NETWORK</Title>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </div>
        </Header>
      }
      footer={
        <Footer fixed height={60}>
          <Center mt="md">
            <Text size="xs">Copyright &copy; 2022, GCETLY Students</Text>
          </Center>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};
export default AuthNavbar;
