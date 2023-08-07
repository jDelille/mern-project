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
		}
	];
	potentialPayout: number;
	tags: [string];
	totalWager: number;
	userId: string;
	_id: string;
	outcome: string;
};
