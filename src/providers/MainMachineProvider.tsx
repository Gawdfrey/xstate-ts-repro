import {
  MainMachineActors,
  MainMachineContextType,
  mainMachine,
} from "@machines/main";
import { useActorRef, useSelector } from "@xstate/react";
import { createContext, useContext, type PropsWithChildren } from "react";
import { fromPromise, type ActorRefFrom, type SnapshotFrom } from "xstate";

export const MainMachineContext = createContext(
  {} as ActorRefFrom<typeof mainMachine>
);

export const MainMachineProvider = ({
  children,
  context,
}: PropsWithChildren & {
  context: MainMachineContextType;
}) => {
  const actor = useActorRef(
    mainMachine.provide({
      actors: {
        getSomething: fromPromise(({ input }) => {
          setTimeout(() => {
            console.log("getSomething", input);
          }, 2000);
          return Promise.resolve("test");
        }),
      } satisfies MainMachineActors,
    }),
    { input: context }
  );
  return (
    <MainMachineContext.Provider value={actor}>
      {children}
    </MainMachineContext.Provider>
  );
};

export const useMainMachineSend = () => {
  const service = useContext(MainMachineContext);
  return service.send;
};

export function useMainMachineSelector<T>(
  selector: (emitted: SnapshotFrom<typeof mainMachine>) => T
) {
  const actor = useContext(MainMachineContext);
  return useSelector(actor, selector);
}
