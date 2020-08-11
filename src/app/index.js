import routes from "./router/index.js";

const store = {
    state: {
        ballsPerGame: 6,
        numberPool: []
    },
    dispatch(action, value) {
        switch(action) {
        case "UPDATE_BALLS_PER_GAME":
            this.state.ballsPerGame = value;
            break;
        case "UPDATE_NUMBER_POOL`":
            this.state.numberPool = value;
            break;
        }
    }
};

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

new Vue({
    router,
    data: {
        state: store.state
    },
    methods: {
        dispatch(action, value) {
            store.dispatch(action,value);
        }
    }
}).$mount("#App");