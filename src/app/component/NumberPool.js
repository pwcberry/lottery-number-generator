import { range } from "../utils.js";

Vue.component("NumberPool", {
    props: ["min", "max", "selected", "limit"],
    data() {
        return {
            numbers: Array.from(range(this.min, this.max)),
            count: 0
        }
    },
    methods: {
      onSelect({ target } ) {
          if (target.checked) {
              if (this.count === this.limit) {
                  target.checked = false;
                  return false;
              } else {
                  target.parentElement.classList.add("is-selected");
                  this.selected.push(target.value);
                  this.count += 1;
              }
          } else {
              target.parentElement.classList.remove("is-selected");
              const i = this.selected.findIndex(x => x === target.value);
              this.selected.splice(i, 1);
              this.count -= 1;
          }
      }
    },
    template: `
        <div class="number-pool">
            <label v-for="n in numbers" v-bind:key="n" class="number-pool__ball">
                <input type="checkbox" v-bind:value="n" v-on:change="onSelect" />
                {{n}}
            </label>
        </div>
    `
});