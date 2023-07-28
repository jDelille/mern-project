export type Post = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	username: string;
	location: string;
	description: string;
	picturePath: string;
	likes: string[];
	comments: string[];
	createdAt: string;
	updatedAt: string;
};
