import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		location: String,
		description: String,
		picturePath: String,
		userPicturePatch: String,
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
