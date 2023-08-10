const checkSpread = (
	spread: number,
	homeScore: number,
	awayScore: number,
	location: string,
	isFavorite: boolean
) => {
	console.log('is team favorite: ' + isFavorite);

	if (location === 'away') {
		if (isFavorite) {
			if (awayScore - spread > homeScore) {
				return true;
			} else {
				return false;
			}
		} else {
			if (awayScore + spread > homeScore) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		if (isFavorite) {
			if (homeScore - spread > awayScore) {
				return true;
			} else {
				return false;
			}
		} else {
			if (homeScore + spread > awayScore) {
				return true;
			} else {
				return false;
			}
		}
	}
};

export default checkSpread;
