import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import ReactMarkdown from "react-markdown";
import store from "./store";
import Select from "./components/Select";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Paste from "./components/Paste";
import Result from "./components/Result";
import Switch from "./components/Switch";

const App = observer(() => (
  <>
    <h1>{store.selected.name} Priority System</h1>
    <Switch />
    {store.selected.inputs.map(item => <Input key={item.name} item={item} />)}
    {store.selected.selects.map(select => (
      <Select key={select.name} select={select} />
    ))}
    {store.selected.checkboxes.map(item => (
      <Checkbox key={item.name} item={item} />
    ))}
    {/* <Paste /> */}
    <Result />
    <ReactMarkdown source={store.selected.instructions} />
  </>
));

// <Select name="miscellanea" />

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
