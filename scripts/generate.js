import { generateGames } from "../src/app/utils.js";

function main() {
    const setOfNumbers = [2, 5, 6, 8, 12, 17, 19, 22, 23, 25, 27, 30, 36, 40, 42, 44];
    const result = generateGames(setOfNumbers);

    result.forEach((game, index) => {
        console.log(`Game ${index + 1}: ${game}`);
    })
}

main();
