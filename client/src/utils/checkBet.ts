const checkSpread = (
	spread: number,
	homeScore: number,
	awayScore: number,
	location: string
) => {
	if (location === 'home') {
		if (homeScore + spread > awayScore) {
			return false;
		} else {
			return true;
		}
	}
};

export default checkSpread;
