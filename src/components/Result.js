import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import store from "../store";
import { Container, Label } from "./Styled";

const Div = styled.div`
  margin: 10px 30px 10px;
`;

const Result = observer(() => (
  <Container>
    <Label>Result (copy and paste in the issue):</Label>
    <Div dangerouslySetInnerHTML={{ __html: store.selected.result }} />
  </Container>
));

export default Result;
