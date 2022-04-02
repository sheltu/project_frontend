import {
  ActionIcon,
  Header,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { MoonStars, Sun } from "tabler-icons-react";

const AuthNavbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [opened, setOpened] = useState(false);
  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Title order={4}>Alumni Students Network</Title>
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
  );
};
export default AuthNavbar;
