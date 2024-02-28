import { Main } from "@components/Main";
import { MainMachineProvider } from "@providers/MainMachineProvider";

export function App() {
  return (
    <MainMachineProvider
      context={{
        test: "",
      }}
    >
      <Main />
    </MainMachineProvider>
  );
}
