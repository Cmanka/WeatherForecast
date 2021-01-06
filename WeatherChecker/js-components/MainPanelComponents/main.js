import { FormBlock } from "./formBlock.js";
import { SelectBlock } from "./selectBlock.js";

export default class Main {
  constructor() {
    const select = new SelectBlock();
    select.render();
    const form = new FormBlock();
    form.render();
  }
}
