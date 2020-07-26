const fs = require("fs");
const pathLib = require("path");
const sass = require("node-sass");
const { DIST_DIR, SRC_DIR, checkDistDir } = require("./utils");

checkDistDir();

sass.render({
    file: pathLib.join(SRC_DIR, "styles/index.scss"),
}, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        const { css } = result;
        fs.writeFileSync(pathLib.join(DIST_DIR, "index.css"), css, { encoding: "utf8" });
        console.log("Wrote index.css");
    }
});
