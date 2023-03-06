import { createEffect, createSignal, Component } from "solid-js";
import Back from "./Back";
import { Layout } from "./Generator/Layout";
import { render } from "solid-js/web";
import { state } from "./State";
import { updateChildren, transformState, quickUpdate } from "./Generator/Utils";
import "./styles.css";

import type { State } from "./Generator/Types";

// open tracks if the panels are in or out
const [open, setOpen] = createSignal(true);
// open tracks if the panels are in or out
const [transform, setTransform] = createSignal(false);

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

// store states in arrays
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

// Quick update by passing index and 2 dimensional array of [property, values]
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

// update states for multiple Components
createEffect(() => {
  if (transform()) transformState(studentState);
  else transformState(resetState);
});

// Update children in Component
const Child = () => {
  return (
    <div
      onClick={() => setTransform(!transform())}
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%"
    ></div>
  );
};
updateChildren(0, [<Child></Child>]);
updateChildren(1, [<Child></Child>]);

const App: Component = () => {
  return (
    <div class="container">
      <Back setOpen={setOpen} open={open}></Back>
      <Layout state={state}></Layout>
    </div>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
