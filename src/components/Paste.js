import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import { Container, Label } from "./Styled";

const Paste = observer(({ name }) => (
  <Container>
    <Label>Populate with an old result:</Label>
    <textarea
      name="paste"
      rows="10"
      cols="30"
      onChange={({ target: { value } }) => store.selected.setPaste(value)}
      value={store.selected.paste}
    />
  </Container>
));

export default Paste;
