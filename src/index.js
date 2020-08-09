import "./app/component/NumberPool.js";
import { range } from "./app/utils.js";

new Vue({
    el: "#App",
    data: {
        maximumBallNumber: 36,
        ballNumbers: Array.from(range(35, 50)),
        numberPool: []
    }
});
