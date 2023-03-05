import { createEffect, Component } from "solid-js";
import Back from "./Back";
import { Layout } from "./Layout";
import { render } from "solid-js/web";
import "./styles.css";
import { open, transform, updateMultiple, quickUpdate, state } from "./State";

import type { State } from "./Types";

// annoying variables
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
