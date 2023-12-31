import { Bet } from './@Bet';
import { Post } from './@Post';
import { User } from './@User';

export type AppState = {
	user: User | null;
	token: string | null;
	posts: Post[];
	_id: string;
	postId: string;
	activePost: Post | null;
	betSlip: Bet[];
};
