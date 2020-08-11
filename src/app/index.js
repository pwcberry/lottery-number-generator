import routes from "./router/index.js";
import { range } from "./utils.js";

const router = new VueRouter({
    routes
});

new Vue({
    router,
    data: {
        ballsPerGame: 6,
        highestBallNumber: 36,
        ballNumbers: Array.from(range(35, 50)),
        numberPool: []
    }
}).$mount("#App");