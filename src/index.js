import "./app/component/NumberPool.js";
import { range } from "./app/utils.js";

new Vue({
    el: "#App",
    data: {
        ballsPerGame: 6,
        highestBallNumber: 36,
        ballNumbers: Array.from(range(35, 50)),
        numberPool: []
    }
});
