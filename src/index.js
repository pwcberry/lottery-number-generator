import { App } from "./app/index.js";

const app = new Vue({
    el: "#App",
    data: {
        message: `G'day mate! Its: ${new Date().toLocaleString()}`,
        seen: false
    }
});

App();
