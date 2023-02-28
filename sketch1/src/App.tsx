import { Switch, Match, Component, createSignal, For } from "solid-js";
import Node from "./Node";
import { render } from "solid-js/web";
import "./styles.css";

const nodes = [];
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

console.table(nodes);

const App: Component = () => {
  const [leftOpen, setLeftOpen] = createSignal(true);
  function togggleLeft() {
    setLeftOpen(!leftOpen());
  }
  return (
    <>
      <div class="container">
        <div class="back">
          <For each={nodes}>{(n) => <Node node={n}></Node>}</For>
        </div>
        <div class="left" style={leftOpen() ? "left: -10px" : "top: 90vh;"}>
          <div class="menu">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <span class="close" onClick={togggleLeft}>
              <Switch>
                <Match when={leftOpen()}>&mdash;</Match>
                <Match when={!leftOpen()}>+</Match>
              </Switch>
            </span>
          </div>
          <div class="programs">
            <For each={programs}>
              {(program) => <span class="program-span">{program}/ </span>}
            </For>
          </div>
        </div>
        <div class="right" style={leftOpen() ? "right: 0" : "top: 90vh;"}></div>
      </div>
      <div class="student"></div>
    </>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
