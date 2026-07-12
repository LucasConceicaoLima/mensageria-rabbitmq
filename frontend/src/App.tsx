import { AppRoutes } from "./routes/AppRoutes";
import { ThemeContextProvider } from "./theme/themeContext";

function App() {
  return (
    <ThemeContextProvider>
      <AppRoutes />
    </ThemeContextProvider>
  );
}

export default App;