import { For, Component, Setter, Accessor, enableScheduling } from "solid-js";
import { Layout } from "./Generator/Layout";
import { randBias } from "./Generator/Utils";
import { createQtGrid } from "./Generator/createQtGrid";
import "./styles.css";

const Node: Component<{
  left: string;
  top: string;
  width: string;
  height: string;
  s: string;
}> = (props) => {
  return (
    <div
      class="temp"
      style={`position: absolute;
      width: ${props.width}; height: ${props.height}; 
      background-color:${props.s}; top: ${props.top}; left: ${props.left}; 
      `}
    >
      <span style="position:relative;" class="title">
        Amir Nevis
      </span>
      <p style="position:relative" class="boxtext">
        Fiverr and TaskRabbit offer access to graphic designers able to create a
        logo, a website, a poster.
      </p>
    </div>
  );
};
// border: 5px solid #131194;
const nodeCollection: any[] = [];
const focus = {
  x: Math.random() * 800 + 50,
  y: Math.random() * 800 + 50,
};
const height: number = window.innerHeight;
const width: number = window.innerWidth;

const points = [...Array(25)].map(() => {
  return {
    x: randBias(0, width, focus.x, 0.4),
    y: randBias(0, height, focus.y, 0.4),
    width: 1,
    height: 1,
  };
});

points.forEach((p: any) => {
  console.log(p);
  let choose = Math.random() * 3;
  choose = Math.floor(choose);
  nodeCollection.push(
    <Node
      left={p.x + "px"}
      top={p.y + "px"}
      width={Math.random() * 400 + 100 + "px"}
      height={Math.random() * 400 + 100 + "px"}
      s={"rgb(255 255 0)"}
    ></Node>
  );
});

const Back: Component = () => () => {
  const state = [
    {
      id: 0,
      styles: {
        top: "0",
        position: "fixed",
        left: "0px",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(239 239 239)",
        overflowY: "scroll",
      },
      children: nodeCollection,
      active: true,
    },
  ];
  return <Layout state={state}></Layout>;
};

export default Back;
// backgroundColor: "#131194",
