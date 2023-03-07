import { For, Component, Setter, Accessor, enableScheduling } from "solid-js";
import { Layout } from "./Generator/Layout";
import { randBias } from "./Generator/Utils";
import { createQtGrid } from "./Generator/createQtGrid";
import "./styles.css";

const programs = [
  "GRAPHIC DESIGN",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "DIGITAL FUTURES",
  "EXPERIMENTAL ANIMATION",
  "DRAWING AND PAINTING",
];
// order-radius:${Math.random() * 100}% ${Math.random() * 100}% ${
//   Math.random() * 100
// }% ${Math.random() * 100}%;
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
        The thing that pisses me off the most is the degradation of the
        intellectual role of the designer." This is what my friend tells me, as
        we listen to each other’s anguished outpourings replete with VAT
        numbers, freelancing and short-term contracts. And that made me wonder
        what constitutes that role, whether it actually existed, how it vanished
        and what replaced it. Trying to answer these questions, I’d like to
        focus on graphic design as it is the field where I come from, and I
        believe it represents a paradigmatic case within the so-called creative
        industries. These days we hear a lot about the gig economy, the economy
        of little jobs, of chores. Platforms like Uber, AirBnB or Foodora are
        quickly becoming the direct intermediaries of any kind of service, a
        seemingly unavoidable development since they are prone to
        monopolization. Graphic design is no exception: online marketplaces like
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
//console.log(points);
const grid = createQtGrid({
  width,
  height,
  points,
  gap: 1,
  maxQtLevels: 4,
});
// console.log("this is grid:");
// console.log(grid);
// grid.areas.forEach((gridarea: any) => {
//   //console.log(gridarea);
//   nodeCollection.push(
//     <Node
//       left={gridarea.x + "px"}
//       top={gridarea.y + "px"}
//       width={gridarea.width + "px"}
//       height={gridarea.height + "px"}
//       s={`rgba(${Math.random() * 255},${Math.random() * 255},${
//         (Math.random() * 255, 1)
//       })`}
//     ></Node>
//   );
// });
// const colors = ["#f815fc", "#58f783", "#fe7530"];
// const colors = ["#f815fc", "#58f783"];
points.forEach((p: any) => {
  console.log(p);
  let choose = Math.random() * 3;
  choose = Math.floor(choose);
  nodeCollection.push(
    <Node
      left={p.x + "px"}
      top={p.y + "px"}
      // width={randBias(0, 10, focus.x, 0.5) + "px"}
      // height={randBias(0, 10, focus.x, 0.5) + "px"}
      width={Math.random() * 400 + 100 + "px"}
      height={Math.random() * 400 + 100 + "px"}
      // s={"rg255 134 19)b("}
      s={"rgb(255 255 0)"}
      // s={`rgba(${Math.random() * 255},${Math.random() * 255},${
      //   (Math.random() * 255, 1)
      // })`}
    ></Node>
  );
});

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
