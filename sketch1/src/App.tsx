import {
  Switch,
  Match,
  createMemo,
  Component,
  createSignal,
  For,
  createEffect,
} from "solid-js";
import Box from "./Box";
import Node from "./Node";
import { render } from "solid-js/web";
import "./styles.css";

const nodes = [];
const studentNames = [
  "Wolfgang Weingart",
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
const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "ADVERTISING",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];

for (let i = 0; i < 50; i++) {
  nodes.push({
    type: randomType(),
    top: Math.round(Math.random() * window.innerHeight),
    left: Math.round(Math.random() * window.innerWidth),
  });
}

for (const x of programs) {
  nodes.push({
    type: "Program",
    top: Math.round(Math.random() * window.innerHeight),
    left: Math.round(Math.random() * window.innerWidth),
  });
}

function randomType() {
  let r = Math.random();
  if (r < 0.4) return "Student";
  else return "Project";
}

let [boxStyle, setBoxStyle] = createSignal({
  top: "0vh",
  right: "0",
});

let [compiled, setCompiled] = createSignal("");

const App: Component = () => {
  const [open, setOpen] = createSignal(true);
  function togggleLeft() {
    setOpen(!open());
  }

  createEffect(() => {
    if (open()) {
      setBoxStyle((current) => {
        console.log(current);
        current.top = "0px";
        return current;
      });
    } else {
      setBoxStyle((current) => {
        current.top = "90vh";
        return current;
      });
    }

    compileStyles();
  });
  function compileStyles() {
    let style = ``;
    for (const [key, value] of Object.entries(boxStyle())) {
      style += `${key}:${value};`;
    }
    setCompiled(style);
  }

  function transformBox() {
    console.log("something");
    setBoxStyle((c) => {
      c.width = "100px";
      c.height = "20px";
      c.right = "100px";
      c.top = "400px";
      return c;
    });
    compileStyles();
  }

  return (
    <>
      <div class="container">
        <div class="back">
          <For each={nodes}>{(n) => <Node node={n}></Node>}</For>
        </div>
        <div class="left" style={open() ? "left: -10px" : "top: 90vh;"}>
          <div class="menu">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <span class="close" onClick={togggleLeft}>
              <Switch>
                <Match when={open()}>&mdash;</Match>
                <Match when={!open()}>+</Match>
              </Switch>
            </span>
          </div>
          <div class="programs">
            <For each={programs}>
              {(program) => <span class="program-span">{program}/ </span>}
            </For>
          </div>
        </div>
        <Box styles={compiled}>
          <p onClick={transformBox}>hellow</p>
        </Box>
      </div>
      <div class="student"></div>
    </>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
