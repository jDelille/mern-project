import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

/* CREATE */
export const createComment = async (req, res) => {
	try {
		const postId = req.params.id;

		const { userId, body, picturePath } = req.body;
		const user = await User.findById(userId);

		console.log(body);

		const newComment = new Comment({
			postId: postId,
			userId,
			name: user.name,
			username: user.username,
			avatar: user.avatar,
			body,
			picturePath,
			likes: {},
			comments: [],
		});

		const savedComment = await newComment.save();

		const updatedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: savedComment._id } },
			{ new: true }
		);

		res.status(201).json({ comment: savedComment, post: updatedPost });
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

/* READ */
export const getCommentsById = async (req, res) => {
	try {
		const commentIds = req.params.ids.split(',');
		console.log(commentIds);
		const comments = await Comment.find({ _id: { $in: commentIds } });
		res.status(200).json(comments);
		console.log('hey');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
