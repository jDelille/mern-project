export type Parlay = {
	bets: [
		{
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
			value: number;
		}
	];
	potentialPayout: number;
	tags: [string];
	totalWager: number;
	userId: string;
	_id: string;
	outcome: string;
	odds: number;
};
