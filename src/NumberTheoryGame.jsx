import SortingGame from "./SortingGame.jsx";
import { createNumberTheoryRound } from "./numberTheoryPresets.js";

function NumberTheoryGame() {
  return (
    <SortingGame
      createRound={createNumberTheoryRound}
      pageClassName="number-game-page"
      eyebrowText="Interactive number theory"
      title="Number Theory Sort"
      description="The category rules change every round. Sort all ten numbers, check your answers, and correct any red numbers."
      itemCount={10}
      itemCountWord="ten"
    />
  );
}

export default NumberTheoryGame;
