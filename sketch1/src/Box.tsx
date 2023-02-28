import { Component } from "solid-js";

const Box: Component = (props) => {
  const style = `
      position: absolute;
      background-color: white;
      right: 0;
      width: 30vw;
      height: 105vh;
      overflow-y: scroll;
      transform: rotate(1deg);
      transition: all 200ms ease-in-out;
  `;
  return <div style={style + props.styles()}>{props.children}</div>;
};
export default Box;
