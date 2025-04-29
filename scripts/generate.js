import { generateGames } from "../src/app/utils.js";

function main() {
    const setOfNumbers = [1, 2, 4, 5, 6, 9, 12, 13, 17, 19, 22, 23, 25, 27, 30, 36, 41, 42, 44];
    const result = generateGames(setOfNumbers);

    result.forEach((game, index) => {
        console.log(`Game ${index + 1}: ${game}`);
    })
}

main();
