import { AppRoutes } from "./routes/AppRoutes";
import { ThemeContextProvider } from "./theme/ThemeContext";
import { SnackbarContextProvider } from "./context/SnackbarProvider";

function App() {
  return (
    <SnackbarContextProvider>
      <ThemeContextProvider>
        <AppRoutes />
      </ThemeContextProvider>
    </SnackbarContextProvider>
  );
}

export default App;