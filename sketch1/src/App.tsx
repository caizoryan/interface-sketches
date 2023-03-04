import {
  createSignal,
  Show,
  For,
  createEffect,
  ParentComponent,
} from "solid-js";
import type { Component } from "solid-js/types";
import { render } from "solid-js/web";
import { createMutable } from "solid-js/store";
import s from "./States";
import "./styles.css";

// to test out reactivity
const [some, setSome] = createSignal("Wowiee");
// Fake children
const ProgramList: Component<{ programs: (string | Function)[] }> = (props) => {
  console.log("ok");
  return (
    <For each={props.programs}>
      {(program) => <p>{typeof program === "string" ? program : program()}</p>}
    </For>
  );
};

const Menu = () => {
  return (
    <div style="padding: 10px; ">
      this is another Component, that I can change using states
    </div>
  );
};

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

const state = createMutable<State>([
  {
    id: 0,
    styles: {
      position: "fixed",
      top: "100px",
      left: "200px",
      width: "100px",
      height: "100px",
      color: "white",
      transition: "300ms ease-in-out all",
    },
    children: [
      <ProgramList programs={["Design", "Illustration"]}></ProgramList>,
    ],
    active: true,
  },
  {
    id: 1,
    styles: {
      position: "fixed",
      top: "300px",
      left: "400px",
      width: "100px",
      fontSize: "4px !important",
      height: "100px",
      color: "red",
      transition: "300ms ease-in-out all",
    },
    children: [
      <ProgramList programs={["Design", "Illustration"]}></ProgramList>,
      <Menu></Menu>,
    ],
    active: true,
  },
]);

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

function applyStates(index: number, styles: Styles, children?: any[]) {
  for (const [key, value] of Object.entries(styles)) {
    if (value === "RESET") state[index].styles = {};
    else if (value === "DELETE" && state[index].styles[key])
      delete state[index].styles[key];
    else state[index].styles[key] = value;
  }
  if (children) state[index].children = children;
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

const Box: ParentComponent<{ state: Box }> = (props) => {
  const [styleString, setStyleString] = createSignal("");
  createEffect(() => {
    setStyleString(styleToString(props.state.styles));
  });
  return (
    <>
      <div style={styleString() + "background-color: black"}>
        {props.children}
      </div>
    </>
  );
};

const Buttons: Component = () => {
  return (
    <>
      <button
        onClick={() =>
          applyStates(0, s.state1.styles, [
            <ProgramList programs={["a", "ok"]}></ProgramList>,
          ])
        }
      >
        State 1
      </button>
      <button onClick={() => applyStates(0, s.state2.styles, [Menu])}>
        State 2
      </button>
      <button
        onClick={() =>
          applyStates(0, s.state3.styles, [
            ProgramList({ programs: ["Something else", some] }),
          ])
        }
      >
        {" "}
        State 3{" "}
      </button>
      <button onClick={() => applyStates(0, s.state4.styles)}> State 4 </button>
      <button onClick={() => setSome("YUHHH")}> YUHHH on state 3 </button>
    </>
  );
};

const App: Component = () => {
  return (
    <div class="container">
      <Buttons></Buttons>
      <Layout state={state}></Layout>
    </div>
  );
};

const root = document.getElementById("root");
render(() => <App />, root!);
