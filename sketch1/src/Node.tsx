import {
  Show,
  Component,
  createEffect,
  createSignal,
  Switch,
  Match,
} from "solid-js";
import "./styles.css";

const Node: Component = (props: any) => {
  const [style, setStyle] = createSignal<string>();
  const [size, setSize] = createSignal<string>();
  const [show, setShow] = createSignal(false);
  const [active, setActive] = createSignal(false);

  if (props.node.type === "Student") {
    setStyle(`
    position: absolute;
    top: ${props.node.top}px;
    left: ${props.node.left}px;
    background-color: rgb(200, 150, 50);
`);

    setSize(`
    width: 10px;
    height: 10px;
`);
  } else if (props.node.type === "Program") {
    setStyle(`
    position: absolute;
    top: ${props.node.top}px;
    left: ${props.node.left}px;
    background-color: rgb(200, 69, 50);
`);
    setSize(`
    width: 20px;
    height: 20px;
`);
  } else if (props.node.type === "Project") {
    setStyle(`
    position: absolute;
    top: ${props.node.top}px;
    left: ${props.node.left}px;
    background-color: rgb(255, 255, 255);
`);
    setSize(`
    width: 5px;
    height: 5px;
`);
  }

  function sizePlus() {
    setSize(` width: 150px; height: 50px; z-index: 100; `);
    setTimeout(() => {
      setShow(true);
    }, 100);
  }
  function sizeMinus() {
    if (!active()) {
      setTimeout(() => {
        setShow(false);
      }, 100);
      if (props.node.type === "Student") {
        setSize(` width: 10px; height: 10px; `);
      } else if (props.node.type === "Program") {
        setSize(` width: 20px; height: 20px; `);
      } else if (props.node.type === "Project") {
        setSize(` width: 5px; height: 5px; `);
      }
    }
  }
  function activate() {
    setActive(true);
    setSize(` width: 350px; height: 250px; z-index: 100; `);
    setShow(false);
  }

  return (
    <div
      class="node"
      style={style() + size()}
      onMouseEnter={sizePlus}
      onMouseLeave={sizeMinus}
      onClick={activate}
    >
      <Show when={show()}>
        {" "}
        <p style="transition: all ease-in 200ms; margin: 10px">
          {props.node.type}
        </p>
      </Show>
      <Show when={active()}>
        <Switch>
          <Match when={props.node.type === "Student"}>
            <p style="transition: all ease-in 200ms; margin: 10px 20px 0 20px; font-size: 20px">
              Student Name
            </p>
            <p style="transition: all ease-in 200ms; margin: 0 20px; font-size: 10px; color: rgb(100, 100, 100)">
              Program
            </p>
            <p style="transition: all ease-in 200ms; margin: 0 10px; font-size: 15px">
              Their Project One
            </p>
          </Match>
        </Switch>
      </Show>
    </div>
  );
};

export default Node;
