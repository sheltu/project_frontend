import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import Pages from "./pages/index";

const theme = {};

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          defaultRadius: "md",
          fontFamily: "Poppins, sans-serif",
          fontFamilyMonospace: "Source Code Pro, monospace",
          headings: {
            fontFamily: "Poppins, sans-serif",
            fontWeight: "700",
          },
          loader: "oval",
        }}
        withGlobalStyles
      >
        <NotificationsProvider autoClose={3000}>
          <Pages />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
export default App;
