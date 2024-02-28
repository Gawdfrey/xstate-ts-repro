import { PromiseActorLogic, setup } from "xstate";

export type MainMachineInitialInput = {
  test: string;
};

export type MainMachineContextType = MainMachineInitialInput;

export type MainMachineActions = {};

export type MainMachineActors = {
  getSomething: PromiseActorLogic<string, MainMachineContextType>;
};

export type MainMachineEvents = any;

export const mainMachine = setup({
  types: {
    events: {} as MainMachineEvents,
    context: {} as MainMachineContextType,
    input: {} as MainMachineInitialInput,
  },
}).createMachine({
  id: "main",
  initial: "fetching",
  context: ({ input }) => input,
  states: {
    fetching: {
      invoke: {
        src: "getSomething",
        input: ({ context }) => context,
      },
    },
  },
});
