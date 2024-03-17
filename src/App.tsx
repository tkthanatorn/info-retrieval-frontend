import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MantineProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Notifications position="top-right" />
          <Router />
        </QueryClientProvider>
      </RecoilRoot>
    </MantineProvider>
  );
};

export default App;
