import { Programs, Menu } from "./ChildComponents";
import { createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import "./styles.css";

type Styles = {
  [key: string]: string;
};
type Box = {
  id: number;
  styles: Styles;
  children?: any[];
  active: Boolean;
};

type State = Box[];
type UpdateProp = [index: number, styles: Styles, children?: any[]];

// trigger variables
// open tracks if the panels are in or out
const [open, setOpen] = createSignal(true);
// open tracks if the panels are in or out
const [transform, setTransform] = createSignal(false);

function updateMultiple(updates: UpdateProp[]) {
  for (const x of updates) updateState(...x);
}

function updateState(index: number, styles: Styles, children?: any[]) {
  for (const [key, value] of Object.entries(styles)) {
    if (value === "RESET") state[index].styles = {};
    else if (value === "DELETE" && state[index].styles[key])
      delete state[index].styles[key];
    else state[index].styles[key] = value;
  }
  if (children) state[index].children = children;
}

function quickUpdate(index: number | number[], style: string[][]) {
  if (typeof index === "number") {
    for (const x of style) {
      state[index].styles[x[0]] = x[1];
    }
  } else
    for (const i of index) {
      for (const x of style) {
        state[i].styles[x[0]] = x[1];
      }
    }
}

function styleToString(styles: Object) {
  // helper function
  const kebabize = (str: string) => {
    return str
      .split("")
      .map((letter: string, idx: number) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
          : letter;
      })
      .join("");
  };

  let swap = "";
  for (const [key, value] of Object.entries(styles)) {
    swap += `${kebabize(key)}: ${value};`;
  }
  return swap;
}

const state = createMutable<State>([
  {
    id: 0,
    styles: {
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 200ms ease-in-out",
      top: "-10px",
      left: "-10px",
      width: "40vw",
      height: "105vh",
    },
    children: [
      <Menu setOpen={setOpen} open={open} transform={transform}></Menu>,
      <Programs setTransform={setTransform} transform={transform}></Programs>,
    ],
    active: true,
  },
  {
    id: 1,
    styles: {
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 200ms ease-in-out",
      top: "0vh",
      right: "0",
      width: "30vw",
      height: "105vh",
    },
    active: true,
  },
]);

export {
  updateMultiple,
  styleToString,
  transform,
  quickUpdate,
  updateState,
  state,
  open,
};
