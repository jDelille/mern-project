type LikesObject = {
	[userId: string]: boolean;
};

export type Comment = {
	_id: string;
	postId: string;
	userId: string;
	name: string;
	username: string;
	avatar: string;
	body: string;
	likes: LikesObject;
	comments: string[];
	createdAt: string;
	updatedAt: string;
	picturePath: string;
};
