import {
  Switch,
  Match,
  Show,
  Component,
  ParentComponent,
  createSignal,
  For,
  createEffect,
} from "solid-js";
import { createMutable } from "solid-js/store";
import Back from "./Back";
import { render } from "solid-js/web";
import "./styles.css";
import {
  open,
  transform,
  styleToString,
  updateMultiple,
  quickUpdate,
  state,
} from "./State";

// types
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

// annoying variables
const studentNames = [
  "Wolfgang Weingart",
  "Hans Richter",
  "Claude Garamond",
  "Jan Tschichold",
  "William Golden",
  "Jacqueline Casey",
  "Cipe Pineles",
  "Susan Kare",
  "Abram Games",
  "Armin Hofmann",
  "Josef Muller-Brockmann",
  "Seymour Chwast",
  "Alexey Brodovitch",
  "Herb Lubalin",
];
const programs = ["CLICK", "ON", "ONE", "OF", "THESE"];

// transformation -> handle with state
const studentState: State = [
  {
    id: 0,
    styles: {
      width: "55vw",
      height: "400px",
      left: "5vw",
      top: "400px",
    },
    active: true,
  },
  {
    id: 1,
    styles: {
      width: "200px",
      height: "200px",
      right: "40vw",
      top: "190px",
      transform: "rotate(-1deg)",
    },
    active: true,
  },
];
const resetState: State = [
  {
    id: 0,
    styles: {
      width: "40vw",
      height: "105vh",
      left: "-10px",
      top: "-10px",
    },
    active: true,
  },
  {
    id: 1,
    styles: {
      width: "30vw",
      height: "105vh",
      right: "-10px",
      top: "-10px",
      transform: "rotate(1deg)",
    },
    active: true,
  },
];

// Components

// This is the main compoenet, we can pass it our State and it will generate ui based on it
const Layout: Component<{ state: State }> = (props) => {
  return (
    <For each={props.state}>
      {(boxState) => (
        <Show when={boxState.active}>
          <Box state={boxState}>
            <For each={boxState.children}>{(child) => child}</For>
          </Box>
        </Show>
      )}
    </For>
  );
};

// This is the Box component Layout will use to make stuff, it takes in the styles and renders it
// it has a createEffect hook so it will re render whenever we change the state
const Box: ParentComponent<{ state: Box }> = (props) => {
  const [styleString, setStyleString] = createSignal("");
  createEffect(() => {
    setStyleString(styleToString(props.state.styles));
  });
  return (
    <>
      <div style={styleString()}>{props.children}</div>
    </>
  );
};

// triggers
const slideOut = () => {
  quickUpdate(0, [
    ["top", "-10px"],
    ["left", "-30vw"],
  ]);
  quickUpdate(1, [
    ["top", "-10px"],
    ["right", "-20vw"],
  ]);
};

const slideIn = () => {
  quickUpdate(0, [
    ["top", "-10px"],
    ["left", "-10px"],
  ]);
  quickUpdate(1, [
    ["top", "-10px"],
    ["right", "0"],
  ]);
};

createEffect(() => {
  if (open()) slideIn();
  else slideOut();
});

// Helpers
createEffect(() => {
  if (transform()) {
    updateMultiple([
      [0, studentState[0].styles],
      [1, studentState[1].styles],
    ]);
  } else {
    updateMultiple([
      [0, resetState[0].styles],
      [1, resetState[1].styles],
    ]);
  }
});

const App: Component = () => {
  return (
    <div class="container">
      <Back></Back>
      <Layout state={state}></Layout>
    </div>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
