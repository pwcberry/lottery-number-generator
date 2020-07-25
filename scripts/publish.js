const path = require("path");
const ghpages = require("gh-pages");

ghpages.publish(path.resolve(__dirname, "../src"), err => {
    if (err) {
        console.error(err);
    }
});
