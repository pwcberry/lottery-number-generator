import "../component/Nav.js";

export default Vue.component("Play", {
    data() {
        return {
            ...this.$root.$data.state,
        };
    },
    template: "<div><lottery-nav></lottery-nav><h1>Play</h1><p>{{numberPool}}</p></div>"
});
