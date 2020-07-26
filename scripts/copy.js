const fs = require("fs");
const pathLib = require("path");
const { DIST_DIR, SRC_DIR, checkDir, checkDistDir } = require("./utils");

checkDistDir();

fs.copyFileSync(pathLib.resolve(__dirname, "../src/index.html"), pathLib.resolve(DIST_DIR, "index.html"));
console.log("Wrote: dist/index.html");

const reJs = /\w+\.js$/;

const traverse = async (path) => {
    const dir = await fs.promises.opendir(path);
    for await (const entry of dir) {
        if (entry.isDirectory()) {
            await traverse(pathLib.join(dir.path, entry.name));
        } else if (reJs.test(entry.name)) {
            const srcPath = pathLib.join(dir.path, entry.name);
            const targetDir = dir.path.replace(SRC_DIR, DIST_DIR);
            const targetPath = pathLib.join(targetDir, entry.name);

            checkDir(targetDir);
            fs.copyFileSync(srcPath, targetPath);
            console.log("Wrote:", targetPath);
        }
    }
};


(async () => {
    try {
        await traverse(SRC_DIR);
    } catch (error) {
        console.error(error);
    }
})();
