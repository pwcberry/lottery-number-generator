import NotFound from "../container/NotFound.js";
import Play from "../container/Play.js";
import Setup from "../container/Setup.js";

const routes = [
    {
        path: '/',
        redirect: "/setup"
    },
    {
        path: "/setup",
        component: Setup
    },
    {
        path: "/play",
        component: Play
    },
    {
        path: "*",
        component: NotFound
    }
];

export default routes;
