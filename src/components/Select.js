import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import { Container, Label } from "./Styled";

const Select = observer(({ select }) => (
  <Container>
    <Label>
      {select.name} <span>(x{select.selected.value}):</span>
    </Label>
    <select
      value={select.selected.name}
      onChange={({ target: { value } }) =>
        store.selected.setSelect(select.name, value)
      }
    >
      {select.items.map(item => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  </Container>
));

export default Select;
