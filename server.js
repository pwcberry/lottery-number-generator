const path = require("path");
const express = require("express");
const connectLiveReload = require("connect-livereload");
const liveReload = require("livereload");
const { DIST_DIR, checkDistDir } = require("./scripts/utils");

checkDistDir();

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(DIST_DIR);

const app = express();
app.use(connectLiveReload());
app.get("/index.css", (_, res) => {
    res.setHeader("content-type", "text/css");
    res.sendFile(path.resolve(DIST_DIR, "index.css"));
});
app.get("/app/:feature/:name", (req, res) => {
    res.setHeader("content-type", "application/javascript");
    res.sendFile(path.resolve(DIST_DIR, "app", req.params.feature, req.params.name));
});
app.get("/app/:name", (req, res) => {
    res.setHeader("content-type", "application/javascript");
    res.sendFile(path.resolve(DIST_DIR, "app", req.params.name));
});
app.get("/app", (req, res) => {
    res.setHeader("content-type", "application/javascript");
    res.sendFile(path.resolve(DIST_DIR, req.path));
});
app.get("/index.js", (req, res) => {
    res.setHeader("content-type", "application/javascript");
    res.sendFile(path.resolve(DIST_DIR, "index.js"))
});
app.get("/", (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
