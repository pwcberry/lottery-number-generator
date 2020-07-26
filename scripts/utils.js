import fs from "fs";
import path from "path";

function getCurrentPath(moduleUrl) {
    const fileUrl = new URL(moduleUrl);
    const filePathname = fileUrl.pathname.replace(/^\/([A-Z]:)/, "$1");
    return path.dirname(filePathname);
}

function getDistDir() {
    const currentPath = getCurrentPath(import.meta.url);
    return path.resolve(currentPath, "../dist");
}

function getSrcDir() {
    const currentPath = getCurrentPath(import.meta.url);
    return path.resolve(currentPath, "../src");
}

function checkDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function checkDistDir() {
    checkDir(getDistDir());
}

export const SRC_DIR = getSrcDir();
export const DIST_DIR = getDistDir();

export {
    getCurrentPath,
    checkDistDir,
    checkDir
};
