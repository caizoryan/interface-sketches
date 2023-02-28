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
  "Hans Richter",
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
const images = [
  "https://d2w9rnfcy7mm78.cloudfront.net/20594360/original_6f947c4d106d489b3f20a4687e1befb0.png?1677479968?bc=0",
  "https://d2w9rnfcy7mm78.cloudfront.net/20594355/original_d18415060f375cfcafe0e894bc5fc15c.png?1677479968?bc=0",
  "https://d2w9rnfcy7mm78.cloudfront.net/20594352/original_86eab6625c535daa192a485470426278.png?1677479969?bc=0",
  "https://d2w9rnfcy7mm78.cloudfront.net/20594357/original_9b14dc59621146adb5c96a54584ddaa0.png?1677479959?bc=0",
  "https://d2w9rnfcy7mm78.cloudfront.net/20594365/original_ee39a8440a8f14b5c43ee3b5d636bc7e.png?1677479966?bc=0",
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

const App: Component = () => {
  const [open, setOpen] = createSignal(true);
  let [showStudents, setShowStudents] = createSignal(false);
  let [studentName, setStudentName] = createSignal("");
  let [showStudent, setShowStudent] = createSignal(false);

  let [boxStyle, setBoxStyle] = createSignal({
    top: "0vh",
    right: "0",
    width: "30vw",
    height: "105vh",
  });

  let [leftBoxStyle, setLeftBoxStyle] = createSignal({
    top: "-10px",
    left: "-10px",
    width: "40vw",
    height: "105vh",
  });

  let [compiled, setCompiled] = createSignal("");
  let [compiledRight, setLeftCompiled] = createSignal("");

  createEffect(() => {
    if (open()) {
      setLeftBoxStyle((current) => {
        console.log(current);
        current.top = "0px";
        return current;
      });
    } else {
      setLeftBoxStyle((current) => {
        current.top = "90vh";
        return current;
      });
    }
    compileStyles(leftBoxStyle, setLeftCompiled);
  });
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
    compileStyles(boxStyle, setCompiled);
  });

  function compileStyles(object, destination) {
    let style = ``;
    for (const [key, value] of Object.entries(object())) {
      style += `${key}:${value};`;
    }
    destination(style);
  }

  let rightDestination = {
    width: "200px",
    height: "200px",
    left: "",
  };
  function slideOut() {
    setOpen(!open());
    setLeftBoxStyle((c) => {
      c.top = "-10px";
      c.left = "-30vw";
      return c;
    });
    compileStyles(leftBoxStyle, setLeftCompiled);

    setBoxStyle((c) => {
      c.top = "-10px";
      c.right = "-20vw";
      return c;
    });
    compileStyles(boxStyle, setCompiled);
  }

  function slideIn() {
    setOpen(!open());
    setLeftBoxStyle((c) => {
      c.top = "-10px";
      c.left = "-10px";
      return c;
    });
    compileStyles(leftBoxStyle, setLeftCompiled);

    setBoxStyle((c) => {
      c.top = "-10px";
      c.right = "0";
      return c;
    });
    compileStyles(boxStyle, setCompiled);
  }
  function transform_right() {
    setBoxStyle((c) => {
      c.width = "200px";
      c.height = "200px";
      c.right = "40vw";
      c.top = "190px";
      c.transform = "rotate(-1deg)";
      return c;
    });
    compileStyles(boxStyle, setCompiled);
  }
  function transform_left() {
    setLeftBoxStyle((c) => {
      c.width = "55vw";
      c.height = "400px";
      c.left = "5vw";
      c.top = "400px";
      return c;
    });
    compileStyles(leftBoxStyle, setLeftCompiled);
  }

  return (
    <>
      <div class="container">
        <div
          class="back"
          onClick={() => {
            if (!showStudent() && open()) {
              slideOut();
            } else if (!showStudent() && !open()) {
              slideIn();
            }
          }}
        >
          <For each={nodes}>{(n) => <Node node={n}></Node>}</For>
        </div>
        <Box styles={compiledRight}>
          <Switch>
            <Match when={!showStudent()}>
              <div class="menu">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <span
                  class="close"
                  onClick={() => {
                    setOpen(!open());
                  }}
                >
                  <Switch>
                    <Match when={open()}>&mdash;</Match>
                    <Match when={!open()}>+</Match>
                  </Switch>
                </span>
              </div>
              <div class="programs">
                <For each={programs}>
                  {(program) => (
                    <span
                      class="program-span"
                      onClick={() => setShowStudents(true)}
                    >
                      {program}/{" "}
                    </span>
                  )}
                </For>
              </div>
            </Match>

            <Match when={showStudent()}>
              <div class="gallery">
                <For each={images}>
                  {(image) => (
                    <img src={image} style="height: 90%; margin: 0 20px;"></img>
                  )}
                </For>
              </div>
            </Match>
          </Switch>
        </Box>

        <Box styles={compiled}>
          <Switch>
            <Match when={showStudents()}>
              <div class="name-wrapper">
                <For each={studentNames}>
                  {(name) => (
                    <p
                      onClick={() => {
                        transform_left();
                        transform_right();
                        setStudentName(name);
                        setShowStudents(false);
                        setShowStudent(true);
                      }}
                    >
                      {name}
                    </p>
                  )}
                </For>
              </div>
            </Match>
            <Match when={showStudent()}>
              <div class="name-title">
                <p>{studentName()}</p>
              </div>
            </Match>
          </Switch>
        </Box>
      </div>
      <div class="student"></div>
    </>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
