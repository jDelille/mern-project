import { createSlice } from '@reduxjs/toolkit';
import { Post } from 'types/@Post';
import { User } from 'types/@User';

interface AuthState {
	mode: 'dark' | 'light';
	user: User | null;
	token: string | null;
	posts: Post[];
	users: User[];
}

const initialState: AuthState = {
	mode: 'light',
	user: null,
	token: null,
	posts: [],
	users: [],
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setCurrentUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setUsers: (state, action) => {
			state.users = action.payload.users;
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
			const { post } = action.payload;

			// Find the index of the post in the state array
			const postIndex = state.posts.findIndex((p) => p._id === post._id);

			// If the post is found in the state array, update it
			if (postIndex !== -1) {
				state.posts[postIndex] = post;
			}
		},
	},
});

export const {
	setMode,
	setCurrentUser,
	setLogout,
	setFollowing,
	setPost,
	setPosts,
	setUsers,
} = authSlice.actions;

export default authSlice.reducer;
