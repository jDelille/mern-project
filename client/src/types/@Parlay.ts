export type Parlay = {
	bets: [
		{
			type: string;
			logo: string;
			matchup: string;
			odds: number;
			teamName: string;
			abbreviation: string;
		}
	];
	potentialPayout: number;
	tags: [string];
	totalWager: number;
	userId: string;
	_id: string;
};
