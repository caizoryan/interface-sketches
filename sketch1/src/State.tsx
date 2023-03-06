import type { State } from "./Generator/Types";
import { createMutable } from "solid-js/store";

const state = createMutable<State>([
  {
    id: 0,
    styles: {
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 400ms ease-in-out",
      top: "-10px",
      left: "-10px",
      width: "40vw",
      height: "105vh",
    },
    active: true,
  },
  {
    id: 1,
    styles: {
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 400ms ease-in-out",
      top: "0vh",
      right: "0",
      width: "30vw",
      height: "105vh",
    },
    active: true,
  },
]);

export { state };
