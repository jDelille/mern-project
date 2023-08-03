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
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		isRetweet: {
			type: Boolean,
			default: false,
		},
		isQuoteRetweet: {
			type: Boolean,
			default: false,
		},
		quoteBody: String,
		originalPost: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
		retweeter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Replace 'User' with your actual User model name
		},
		retweetCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
