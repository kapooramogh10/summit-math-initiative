import SortingGame from "./SortingGame.jsx";
import { createFractionDecimalPercentRound } from "./fractionDecimalPercentPresets.js";

function FractionDecimalPercentGame() {
  return (
    <SortingGame
      createRound={createFractionDecimalPercentRound}
      pageClassName="number-game-page"
      eyebrowText="Interactive fractions, decimals & percents"
      title="Fractions, Decimals & Percents Sort"
      description="The category rules change every round. Sort all ten values — fractions, decimals, and percents — and check your answers."
      itemCount={10}
      itemCountWord="ten"
    />
  );
}

export default FractionDecimalPercentGame;
