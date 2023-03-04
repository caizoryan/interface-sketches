import {
  Switch,
  Match,
  createMemo,
  Component,
  createSignal,
  For,
  createEffect,
} from "solid-js";
import { render } from "solid-js/web";
import { createMutable } from "solid-js/store";
import "./styles.css";

type Box = {
  id: number;
  styles: Object;
  children: any[];
  active: Boolean;
};

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
      filter: "blur(4px)",
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

const ProgramList = (programs: (string | Function)[]) => {
  return (
    <For each={programs}>
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

const state = createMutable<Box[]>([
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
    children: [ProgramList(["Design", "Illustration"])],
    active: true,
  },
]);

function applyStates(index: number, styles: Object, children?: Function[]) {
  for (const [key, value] of Object.entries(styles)) {
    if (value === "DELETE") delete state[index].styles[key];
    else state[index].styles[key] = value;
  }

  if (children) state[index].children = children;
}

function compileCss(styles: Object) {
  // TODO add a camel case to kebab case converter
  let swap = "";
  for (const [key, value] of Object.entries(styles)) {
    swap += `${key}: ${value};`;
  }
  return swap;
}

const Box: Component = (props: any) => {
  const [compiledStyles, setCompiledStyles] = createSignal("");
  createEffect(() => {
    setCompiledStyles(compileCss(props.state.styles));
  });
  return (
    <>
      <div style={compiledStyles() + "background-color: black"}>
        {props.children}
      </div>
    </>
  );
};

createEffect(() => {
  console.log(state[0].styles);
});
const Buttons: Component = () => {
  return (
    <>
      <button
        onClick={() =>
          applyStates(0, s.state1.styles, [
            ProgramList(["Graphic Design, Illustration"]),
          ])
        }
      >
        State 1
      </button>
      <button onClick={() => applyStates(0, s.state2.styles, [Menu])}>
        State 2
      </button>
      <button onClick={() => applyStates(0, s.state3.styles)}> State 3 </button>
      <button onClick={() => applyStates(0, s.state4.styles)}> State 4 </button>
    </>
  );
};

const App: Component = () => {
  return (
    <div class="container">
      <Buttons></Buttons>
      <Box state={state[0]}>{state[0].children[0]}</Box>
    </div>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
