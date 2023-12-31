type LikesObject = {
	[userId: string]: boolean;
};

export type Post = {
	_id: string;
	userId: string;
	name: string;
	username: string;
	location: string;
	body: string;
	avatar: string;
	likes: LikesObject;
	comments: string[];
	createdAt: string;
	updatedAt: string;
	picturePath: string;
	isRetweet: string;
	retweetCount: number;
	isQuoteRetweet: boolean;
	quoteBody: string;
	retweeter: string;
	originalPost: string;
	betId: string;
	isBet: boolean;
};
