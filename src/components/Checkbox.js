import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import { Container, Label } from "./Styled";

const Checkbox = observer(({ item }) => (
  <Container>
    <Label>
      {item.name}: (x{item.value})
    </Label>
    <input
      name={item.name}
      type="checkbox"
      value={item.active}
      checked={item.active}
      onChange={({ target: { checked } }) =>
        store.selected.setCheckbox(item.name, checked)
      }
    />
  </Container>
));

export default Checkbox;
