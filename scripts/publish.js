const path = require("path");
const ghPages = require("gh-pages");

ghPages.publish(
    path.resolve(__dirname, "../dist"),
    {
        repo: "https://github.com/pwcberry/lottery-number-generator.git",
        message: "Ready to publish",
        push: false,
    },
    (error) => {
        if (error) {
            console.error(error);
        }
    }
);
