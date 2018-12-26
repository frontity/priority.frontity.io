import React from "react";
import store from "../store";

const Switch = ({ tab, setTab }) => (
  <select
    value={store.selected.name}
    onChange={({ target: { value } }) => store.setSelected(value)}
  >
    {store.systems.map(system => (
      <option key={system.name} value={system.name}>
        {system.name}
      </option>
    ))}
  </select>
);

export default Switch;
