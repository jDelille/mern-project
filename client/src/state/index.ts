import { createSlice } from '@reduxjs/toolkit';
import { Post } from 'types/@Post';
import { User } from 'types/@User';

interface AuthState {
	mode: 'dark' | 'light';
	user: User | null;
	token: string | null;
	posts: Post[];
}

const initialState: AuthState = {
	mode: 'light',
	user: null,
	token: null,
	posts: [],
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFollowing: (state, action) => {
			if (state.user) {
				state.user.following = action.payload.following;
			} else {
				console.error('user following non existent');
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post: Post) => {
				if (post._id === action.payload.post_id) {
					return post;
				}
			});
			state.posts = updatedPosts as Post[];
		},
	},
});

export const { setMode, setLogin, setLogout, setFollowing, setPost, setPosts } =
	authSlice.actions;

export default authSlice.reducer;
