import fs from "fs";
import pathLib from "path";
import sass from "node-sass";
import { DIST_DIR, SRC_DIR, checkDistDir } from "./utils.js";

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
