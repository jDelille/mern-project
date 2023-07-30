import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
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
		location: String,
		body: String,
		picturePath: String,
		avatar: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
