export default function calculateParlayOddsAmerican(oddsArray) {
	const decimalOddsArray = oddsArray.map((odds) => {
		if (odds > 0) {
			return odds / 100 + 1;
		} else {
			return 100 / Math.abs(odds) + 1;
		}
	});

	const parlayDecimalOdds = decimalOddsArray.reduce((a, b) => a * b, 1);

	// Convert back to American odds
	const parlayAmericanOdds =
		parlayDecimalOdds > 2
			? Math.round((parlayDecimalOdds - 1) * 100)
			: -100 / (1 - parlayDecimalOdds);

	return parlayAmericanOdds;
}
