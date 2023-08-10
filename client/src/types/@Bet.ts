export type Bet = {
	type: string;
	logo: string;
	matchup: string;
	odds: number;
	teamName: string;
	abbreviation: string;
	statusLink: string;
	homeScore: string;
	awayScore: string;
	location: string;
	isCompleted: boolean;
	wager: number;
	teamLogo: string;
	isWinner?: boolean;
	isFavorite: boolean;
	isLost?: boolean;
};
