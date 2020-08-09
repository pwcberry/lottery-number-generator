import { range } from "../utils.js";

export default Vue.component("NumberPool", {
    props:{
        lowest: Number,
        highest: Number,
        minCount: Number,
        selected: Array
    },
    data() {
        return {
            count: 0
        }
    },
    computed: {
       numbers() {
           return Array.from(range(this.lowest, this.highest));
       }
    },
    methods: {
      onSelect({ target } ) {
          if (target.checked) {
              target.parentElement.classList.add("is-selected");
              this.selected.push(target.value);
              this.count += 1;
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
            <label v-for="n in numbers" :key="n" class="number-pool__ball">
                <input type="checkbox" v-bind:value="n" v-on:change="onSelect" />
                {{n}}
            </label>
        </div>
    `
});
