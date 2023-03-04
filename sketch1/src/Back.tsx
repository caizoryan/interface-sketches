import { For, Component } from "solid-js";
import "./styles.css";
import Node from "./Node";

const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];

const nodes: any[] = [];
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

const Back: Component = () => {
  return (
    <div class="back">
      <For each={nodes}>{(n) => <Node node={n}></Node>}</For>
    </div>
  );
};

export default Back;
