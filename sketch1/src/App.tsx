import { createEffect, createSignal, For, Component } from "solid-js";
import Back from "./Back";
import { Layout } from "./Generator/Layout";
import { render } from "solid-js/web";
import { state } from "./State";
import {
  updateChildren,
  transformState,
  quickUpdate,
  updateState,
} from "./Generator/Utils";
import "./styles.css";

import type { State } from "./Generator/Types";

const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];
const students = [
  "Roberto Stuart",
  "Abrianna Kim",
  "Yasmin Cowan",
  "Bianca Post",
  "Jacoby Ralston",
  "Richard Chung",
  "Lourdes Starnes",
  "Gloria Kirchner",
  "Nina Doherty",
  "Raina Olivas",
];
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
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 400ms ease-in-out",
      top: "-10px",
      left: "-10px",
      width: "50vw",
      height: "105vh",
    },
    active: true,
  },
  {
    id: 1,
    styles: {
      position: "absolute",
      backgroundColor: "white",
      overflowY: "scroll",
      transform: "rotate(1deg)",
      transition: "all 400ms ease-in-out",
      top: "0vh",
      right: "0",
      width: "30vw",
      height: "105vh",
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

const StudentNames: Component<{ program: string; students: string[] }> = (
  props
) => {
  return (
    <>
      <h1 class="program-heading">{props.program}</h1>
      <div class="students-container">
        <For each={props.students}>
          {(student) => <p class="student-name">{student}</p>}
        </For>
      </div>
    </>
  );
};

function showStudents(program: string) {
  // call database to show students in this
  updateState(1, {
    top: "200px",
    right: "10vw",
    width: "70vw",
    height: "50vh",
    backgroundColor: "rgba(250, 250, 250)",
  });
  updateChildren(1, [
    <StudentNames program={program} students={students}></StudentNames>,
  ]);
}
const ProgramList: Component<{ programs: string[]; onClick: Function }> = (
  props
) => {
  const [selected, setSelected] = createSignal("");
  return (
    <div class="program-container">
      <For each={props.programs}>
        {(program) => {
          return (
            <p
              class={program === selected() ? "program-selected" : "program"}
              onClick={() => {
                props.onClick(program);
                setSelected(program);
              }}
            >
              {program}/
            </p>
          );
        }}
      </For>
    </div>
  );
};
// Update children in Component
const Child = () => {
  return (
    <div
      onClick={() => setTransform(!transform())}
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%"
    ></div>
  );
};
updateChildren(0, [
  <Child></Child>,
  <ProgramList programs={programs} onClick={showStudents}></ProgramList>,
]);
updateChildren(1, [<Child></Child>]);

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
