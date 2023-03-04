import {
  Switch,
  Match,
  Show,
  Component,
  For,
  Accessor,
  Setter,
} from "solid-js";
import "./styles.css";
const programs = ["CLICK", "ON", "ONE", "OF", "THESE"];

// Menu is the top circles and +- component
const Menu: Component<{
  setOpen: Setter<Boolean>;
  open: Accessor<Boolean>;
  transform: Accessor<Boolean>;
}> = (props) => {
  return (
    <>
      <Show when={!props.transform()}>
        <div class="menu">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <span
            class="close"
            onClick={() => {
              props.setOpen(!props.open());
            }}
          >
            <Switch>
              <Match when={props.open()}>&mdash;</Match>
              <Match when={!props.open()}>+</Match>
            </Switch>
          </span>
        </div>
      </Show>
    </>
  );
};

// Program list, using this to test, if you click itll toggle views
const Programs: Component<{
  setTransform: Setter<Boolean>;
  transform: Accessor<Boolean>;
}> = (props) => {
  return (
    <div class="programs">
      <Switch>
        <Match when={!props.transform()}>
          <For each={programs}>
            {(program) => (
              <span
                class="program-span"
                onClick={() => props.setTransform(!props.transform())}
              >
                {program}/{" "}
              </span>
            )}
          </For>
        </Match>
        <Match when={props.transform()}>
          <span
            class="program-span"
            onClick={() => props.setTransform(!props.transform())}
          >
            Go Back
          </span>
        </Match>
      </Switch>
    </div>
  );
};

export { Programs, Menu };
