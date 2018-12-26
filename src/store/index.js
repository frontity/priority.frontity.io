import { types, onSnapshot } from "mobx-state-tree";
import hash from "hash-it";
import bugs from "../snapshots/bugs.js";
import reqFeatures from "../snapshots/req-features.js";

const Item = types.model("Item", {
  name: types.identifier,
  value: types.number,
  description: types.string
});

const Select = types.model("Select", {
  name: types.string,
  items: types.array(Item),
  selected: types.reference(Item, {
    get: (identifier, parent) =>
      parent.items.find(item => item.name === identifier),
    set: value => value
  })
});

const Input = types.model("Input", {
  name: types.identifier,
  value: types.string,
  description: types.string,
  formula: types.optional(types.string, "({ total, value }) => total * value")
});

const Checkbox = Item.props({
  active: false
});

const System = types
  .model("System", {
    name: types.identifier,
    paste: types.optional(types.string, ""),
    inputs: types.optional(types.array(Input), []),
    selects: types.optional(types.array(Select), []),
    checkboxes: types.optional(types.array(Checkbox), [])
  })
  .views(self => ({
    get result() {
      const inputs = self.inputs.reduce((obj, input) => {
        obj[input.name] = input.value;
        return obj;
      }, {});
      let total = self.inputs.reduce((sum, { name, value, formula }) => {
        return eval(`
            const inputs = {${self.inputs.map(
              input => `"${input.name}": ${parseFloat(input.value, 10)}`
            )}};
            (${formula})({ total: ${sum}, value: ${parseFloat(
          value,
          10
        )}, inputs })`);
      }, 1);
      total = self.selects.reduce(
        (sum, select) => sum * select.selected.value,
        total
      );
      total = self.checkboxes.reduce(
        (sum, item) => (item.active ? sum * item.value : sum),
        total
      );
      let result = Math.round(total * 100) / 100;
      if (result > 1) result = Math.round(result);
      const inputsText = self.inputs
        .map(input => `${input.name}: **(${input.value})**<br />`)
        .join("");
      const selectText = self.selects
        .map(
          select =>
            `${select.name}: **${select.selected.name} (x${
              select.selected.value
            })**<br />`
        )
        .join("");
      const checkboxesText = self.checkboxes
        .filter(item => item.active)
        .map(item => `${item.name}: **yes (x${item.value})**<br />`)
        .join("");
      const resultText = `PRIORITY: **[${result}]**<br />`;
      return `${inputsText}${selectText}${checkboxesText}${resultText}`;
    },
    get instructions() {
      const inputsText = self.inputs
        .map(item => `- ### ${item.name}:\n  - ${item.description}\n`)
        .join("");
      const selectsText = self.selects
        .map(select => {
          const header = `- ### ${select.name}:\n`;
          const itemsText = select.items
            .map(
              item =>
                `  - **${item.name}**: ${item.description} (x${item.value}).\n`
            )
            .join("");
          return `${header}${itemsText}`;
        })
        .join("");
      const checkboxesText = self.checkboxes
        .map(
          item =>
            `- ### ${item.name}:\n  - ${item.description} (x${item.value})\n`
        )
        .join("");
      return `## Instructions:\n${inputsText}${selectsText}${checkboxesText}`;
    }
  }))
  .actions(self => ({
    setPaste: paste => {
      self.paste = paste;
      try {
        // self.size = /size: \*\*\(([\d.]+)M\)/i.exec(paste)[1];
        // Object.keys(enums).forEach(enu => {
        //   const rg = new RegExp(enu + ": \\*\\*([\\w-]+)", "i");
        //   const res = rg.exec(paste);
        //   if (res && res[1]) self[enu] = res[1];
        // });
      } catch (error) {
        alert("Sorry, can't convert that text! Check the console.");
        console.error(error);
      }
    },
    setInput: (name, value) => {
      self.inputs.find(item => item.name === name).value = value;
    },
    setSelect: (name, value) => {
      self.selects.find(item => item.name === name).selected = value;
    },
    setCheckbox: (name, value) => {
      console.log(value);
      self.checkboxes.find(item => item.name === name).active = value;
    }
  }));

const Store = types
  .model("Model", {
    systems: types.array(System),
    selected: types.reference(System)
  })
  .actions(self => ({
    setSelected: system => (self.selected = system)
  }));

const defaultSnapshot = {
  systems: [bugs, reqFeatures],
  selected: "Bugs"
};
const defaultSnapshotHash = `${hash(defaultSnapshot)}`;

const localSnapshotHash = window.localStorage.getItem("hash");

console.log(defaultSnapshotHash, localSnapshotHash);

const state =
  (localSnapshotHash === defaultSnapshotHash &&
    JSON.parse(window.localStorage.getItem("snapshot"))) ||
  defaultSnapshot;

const store = Store.create(state);

onSnapshot(store, snapshot => {
  console.log(snapshot);
  window.localStorage.setItem("hash", defaultSnapshotHash);
  window.localStorage.setItem("snapshot", JSON.stringify(snapshot));
});

export default store;
