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

// Ok so how am I going to do this
// First create a box component,  it can be passed a signal that will take cake of its styling
// It wil also have children in this signal, the children will also change and it will update in the box component
// I should be able to update the signal whenever and the box will transform

// what will the box component have?
// I can have a set state method for the box, the state will contain the style and children
// state would be an object signal that w

// what will we need to render a page
// consider the data we will have
// consider how many components it will take to construct the layout, each component the will have data as smaller components
// eg: <p>{student()}</p>

// what will we need to render a page
// Data + Its design in html/css > Component + color, position, dimensions > How many components: active and inactivity

// So we pass layout, a mega component an array of states
// The layout component will run a <For> to make box components, if active
// the box components will render its children based on data
// the states can be changed by onclick events in components, they can change specific value of a specific box.

// have template states.
// make a state generator?

const ProgramList = (programs: string[]) => {
  return <For each={programs}>{(program) => <p>{program}</p>}</For>;
};

const Menu = () => {
  return (
    <div style="postion: fixed; width: 100px; height: 50px; background-color: orange;"></div>
  );
};

const state = createMutable([
  {
    id: 0,
    name: "som,et",
    styles: {
      position: "fixed",
      top: "100px",
      left: "200px",
      width: "100px",
      height: "100px",
      transition: "200ms ease all",
    },
    children: [ProgramList(["Graphic deisng", "illustration"]), Menu],
    active: true,
  },
]);

function compileCss(styles: Object) {
  // add a camel case to kebab case converter
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
      <div
        onClick={() => {
          if (props.state.styles.left === "100px") {
            props.state.styles.left = "600px";
          } else props.state.styles.left = "100px";
        }}
        style={compiledStyles() + "background-color: red"}
      ></div>
    </>
  );
};

createEffect(() => {
  console.log(state[0].styles);
});

function pleaseWork() {
  if (state[0].styles.top === "100px") state[0].styles.top = "400px";
  else state[0].styles.top = "100px";
}
const App: Component = () => {
  return (
    <div class="container">
      <Box state={state[0]}></Box>
      <button onClick={pleaseWork}>{state[0].name} see</button>
    </div>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
