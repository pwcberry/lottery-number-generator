import { range } from "../utils.js";

Vue.component("NumberPool", {
    props:{
        min: Number,
        max: Number,
        limit: Number,
        selected: Array
    },
    data() {
        return {
            count: 0
        }
    },
    computed: {
       numbers() {
           return Array.from(range(this.min, this.max));
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
            <label v-for="n in numbers" :key="n" class="number-pool__ball">
                <input type="checkbox" v-bind:value="n" v-on:change="onSelect" />
                {{n}}
            </label>
        </div>
    `
});
