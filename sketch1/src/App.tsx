import { createSignal, For, createEffect, ParentComponent } from "solid-js";
import type { Component } from "solid-js/types";
import { render } from "solid-js/web";
import { createMutable } from "solid-js/store";
import "./styles.css";
const s = {
  state1: {
    index: 0,
    styles: {
      top: "400px",
      left: "400px",
      width: "500px",
      height: "200px",
    },
  },
  state2: {
    index: 0,
    styles: {
      top: "400px",
      left: "0px",
      width: "800px",
      height: "100px",
    },
  },
  state3: {
    index: 0,
    styles: {
      top: "600px",
      left: "10px",
      width: "400px",
      height: "300px",
    },
  },
  state4: {
    index: 0,
    styles: {
      top: "250px",
      left: "700px",
      width: "400px",
      height: "800px",
    },
  },
};

type Box = {
  id: number;
  styles: Object;
  children: any[];
  active: Boolean;
};

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
    <div style="padding: 10px; font-size: 20px">
      this is another Component, that I can change using states
    </div>
  );
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
        <Box state={boxState}>
          <For each={boxState.children}>{(child) => child}</For>
        </Box>
      )}
    </For>
  );
};

function applyStates(index: number, styles: Object, children?: any[]) {
  for (const [key, value] of Object.entries(styles)) {
    if (value === "DELETE" && state[index].styles[key])
      delete state[index].styles[key];
    else state[index].styles[key] = value;
  }

  if (children) state[index].children = children;
}

function styleToString(styles: Object) {
  // TODO add a camel case to kebab case converter
  // To add for example background-color
  let swap = "";
  for (const [key, value] of Object.entries(styles)) {
    swap += `${key}: ${value};`;
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

const [some, setSome] = createSignal("Wowiee");
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
