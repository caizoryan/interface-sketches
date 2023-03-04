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

// Menu is the top circles and +- component
const Menu: Component<{
  setOpen: Function;
  open: Function;
  transfrom: Function;
}> = (props) => {
  return (
    <>
      <Show when={!transfrom()}>
        <div class="menu">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <span
            class="close"
            onClick={() => {
              props.setOpen(!props.open());
            }}
          >
            <Switch>
              <Match when={props.open()}>&mdash;</Match>
              <Match when={!props.open()}>+</Match>
            </Switch>
          </span>
        </div>
      </Show>
    </>
  );
};

// Program list, using this to test, if you click itll toggle views
const Programs: Component<{
  setTransform: Function;
  transfrom: Function;
}> = (props) => {
  return (
    <div class="programs">
      <Switch>
        <Match when={!transfrom()}>
          <For each={programs}>
            {(program) => (
              <span
                class="program-span"
                onClick={() => props.setTransform(!transfrom())}
              >
                {program}/{" "}
              </span>
            )}
          </For>
        </Match>
        <Match when={transfrom()}>
          <span
            class="program-span"
            onClick={() => props.setTransform(!transfrom())}
          >
            Go Back
          </span>
        </Match>
      </Switch>
    </div>
  );
};

// trigger variables
// open tracks if the panels are in or out
const [open, setOpen] = createSignal(true);
// open tracks if the panels are in or out
const [transfrom, setTransform] = createSignal(false);

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
      <Menu setOpen={setOpen} open={open} transfrom={transfrom}></Menu>,
      <Programs setTransform={setTransform} transfrom={transfrom}></Programs>,
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
type UpdateProp = [index: number, styles: Styles, children?: any[]];
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

createEffect(() => {
  if (transfrom()) {
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
