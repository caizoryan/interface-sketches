import { For, Component } from "solid-js";
import { Layout } from "./Layout";
import "./styles.css";

const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];

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
    active: true,
  },
];

const Node: Component = () => {
  return <div style=""></div>;
};
const Back: Component = () => {
  return <Layout state={state}></Layout>;
};

export default Back;
