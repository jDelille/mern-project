export async function getGameStatus(href: string) {
	try {
		const res = await fetch(href);
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

export async function getScore(href: string) {
	try {
		const res = await fetch(href);
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
