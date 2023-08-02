import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		postId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
		body: String,
		picturePath: String,
		avatar: String,
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
