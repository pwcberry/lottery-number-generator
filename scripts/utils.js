const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "../src");
const DIST_DIR = path.resolve(__dirname, "../dist");

function checkDistDir() {
    if (!fs.existsSync(DIST_DIR)) {
        console.log("Creating \"dist\"...");
        fs.mkdirSync(DIST_DIR);
    }
}

function checkDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

module.exports = {
    DIST_DIR,
    SRC_DIR,
    checkDir,
    checkDistDir
};
