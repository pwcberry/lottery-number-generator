import { range } from "../utils.js";

export default Vue.component("NumberPool", {
    props: {
        lowest: Number,
        highest: Number,
        minCount: Number,
        selected: Array
    },
    data() {
        return {
            count: 0,
            selectedUpdated: this.selected
        };
    },
    computed: {
        numbers() {
            return Array.from(range(this.lowest, this.highest));
        }
    },
    methods: {
        onSelect({ target }) {

            if (target.checked) {
                target.parentElement.classList.add("is-selected");

                this.$data.selectedUpdated.push(parseInt(target.value));
                this.count += 1;

                if (this.count === this.minCount) {
                    this.$emit("reached-minimum-count");
                }
            } else {
                target.parentElement.classList.remove("is-selected");

                const i = this.selected.findIndex(x => x === target.value);
                this.$data.selectedUpdated.splice(i, 1);

                // We only want to fire this event specifically when the count is about to fall below the threshold
                if (this.count === this.minCount) {
                    this.$emit("below-minimum-count");
                }

                this.count -= 1;
            }
            this.$emit("updated-selected", this.$data.selectedUpdated.concat([]));
        }
    },
    template: `
      <div class="number-pool">
      <label v-for="n in numbers" :key="n" class="number-pool__ball">
        <input type="checkbox" v-bind:value="n" v-on:change="onSelect"/>
        {{ n }}
      </label>
      </div>
    `
});
