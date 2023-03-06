import { For, Component, Setter, Accessor } from "solid-js";
import { Layout } from "./Generator/Layout";
import "./styles.css";

const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];

const Node: Component<{ left: string; top: string }> = (props) => {
  return (
    <div
      style={`position: absolute; width: 20px; height: 20px; background-color: red; top: ${props.top}; left: ${props.left}`}
    ></div>
  );
};

const nodeCollection: any[] = [];
for (let i = 0; i < 10; i++) {
  nodeCollection.push(
    <Node
      left={Math.random() * 1200 + "px"}
      top={Math.random() * 800 + "px"}
    ></Node>
  );
}

const Back: Component<{ setOpen: Setter<Boolean>; open: Accessor<Boolean> }> = (
  props
) => {
  const state = [
    {
      id: 0,
      styles: {
        top: "0",
        position: "fixed",
        left: "0px",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(10, 10, 10)",
      },
      children: nodeCollection,
      active: true,
    },
  ];
  return <Layout state={state}></Layout>;
};

export default Back;
