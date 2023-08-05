export type Statistics = {
	abbreviation: string;
	description: string;
	displayName: string;
	displayValue: string;
	name: string;
	shortDisplayName: string;
	value: number;
};

export type Predictions = {
	awayTeam: {
		statistics: Statistics[];
	};
	homeTeam: {
		statistics: Statistics[];
	};
	lastModified: string;
};
