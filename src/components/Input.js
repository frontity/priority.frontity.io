import React, { useContext } from "react";
import { observer } from "mobx-react";
import store from "../store";
import { Container, Label } from "./Styled";

const Input = observer(({ item }) => (
  <Container>
    <Label>{item.name}:</Label>
    <input
      type="text"
      size="25"
      name={item.name}
      value={item.value}
      onChange={({ target: { value } }) =>
        store.selected.setInput(item.name, value)
      }
    />
  </Container>
));

export default Input;
