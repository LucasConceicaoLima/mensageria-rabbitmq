import { AppRoutes } from "./routes/AppRoutes";
import { ThemeContextProvider } from "./theme/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <AppRoutes />
    </ThemeContextProvider>
  );
}

export default App;