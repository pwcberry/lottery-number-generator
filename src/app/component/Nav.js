export default Vue.component("LotteryNav", {
    template: `
    <nav>
        <ul>
            <li><router-link to="/setup">Setup</router-link></li>
            <li><router-link to="/play">Play</router-link></li>
        </ul>
    </nav>`
});
