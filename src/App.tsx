import Router from "./routes";
import { MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";
import { Notifications } from "@mantine/notifications";
import { PersistGate } from "redux-persist/integration/react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackUI}
      onError={(error: Error) => {
        console.error(error);
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={theme}>
            <Notifications />
            <Router />
          </MantineProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
