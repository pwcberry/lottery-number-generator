import "../component/Nav.js";
import "../component/NumberPool.js";
import { range } from "../utils.js";

export default Vue.component("Setup", {
    props: {
        ballsPerGame: Number,
        numberPool: Array
    },
    data() {
        return {
            highestBallNumber: 36,
            ballNumbers: Array.from(range(35, 50)),
        };
    },
    computed: {
      selectedNumbers() {
          return [];
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
            v-bind:selected="selectedNumbers"
        ></number-pool>
      </article>
      </div>`
});
