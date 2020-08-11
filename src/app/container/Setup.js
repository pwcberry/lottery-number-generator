import "../component/Nav.js";
import "../component/NumberPool.js";
import { range } from "../utils.js";

export default Vue.component("Setup", {
    data() {
        return {
            ...this.$root.$data.state,
            highestBallNumber: 36,
            ballNumbers: Array.from(range(35, 50)),
        };
    },
    methods: {
        updateSelected(selectedNumbers) {
            this.$root.dispatch("UPDATE_NUMBER_POOL", selectedNumbers);
        }
    },
    template: `
      <div>
      <lottery-nav></lottery-nav>
      <article>
        <h1>Setup</h1>
        <p><label>Maximum number of balls:&nbsp;<select v-model="highestBallNumber">
          <option v-for="n in ballNumbers" :key="n" v-bind:value="n">{{ n }}</option>
        </select></label></p>
        <number-pool
            v-bind:lowest="1"
            v-bind:highest="highestBallNumber"
            v-bind:minCount="ballsPerGame"
            v-bind:selected="numberPool"
            v-on:updated-selected="updateSelected"
        ></number-pool>
      </article>
      </div>`
});
