export async function getTopGames(sport: string, league: string) {
	try {
		const res = await fetch(
			`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch matches');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getMatchInfo(sport: string, league: string, id: string) {
	try {
		const res = await fetch(
			`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${id}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch match info');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getTeam(href: string) {
	try {
		const res = await fetch(href);

		if (!res.ok) {
			throw new Error('Failed to fetch team data.');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getOdds(href: string) {
	try {
		const res = await fetch(href);

		if (!res.ok) {
			throw new Error('Failed to fetch match odds.');
		}

		const data = await res.json();
		return data.items;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getScore(href: string) {
	try {
		const res = await fetch(href);

		if (!res.ok) {
			throw new Error('Failed to fetch team score.');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getPrediction(href: string) {
	try {
		const res = await fetch(href);

		if (!res.ok) {
			throw new Error('Failed to fetch team score.');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
