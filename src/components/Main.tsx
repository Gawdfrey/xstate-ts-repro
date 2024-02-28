import { useMainMachineSelector } from "@providers/MainMachineProvider";

export function Main() {
  const state = useMainMachineSelector((emitted) => emitted.value);
  return <div>Current state: {state}</div>;
}
