import Bet from '../models/Bet.js';
import Parlay from '../models/Parlay.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res) => {
	try {
		const { userId, body, picturePath } = req.body;
		const user = await User.findById(userId);
		const newPost = new Post({
			userId,
			name: user.name,
			username: user.username,
			location: user.location,
			avatar: user.avatar,
			body,
			picturePath,
			likes: {},
			comments: [],
		});

		await newPost.save();

		const post = await Post.find();
		res.status(201).json(post);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const retweetPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, isQuoteRetweet, quoteBody } = req.body;
		const originalPost = await Post.findById(id);
		if (!originalPost) {
			return res.status(404).json({ message: 'Original post not found' });
		}

		const existingRetweet = await Post.findOne({
			originalPost: id,
			retweeter: username,
		});

		if (existingRetweet) {
			return res
				.status(400)
				.json({ message: 'You have already retweeted this post' });
		}

		const retweet = new Post({
			userId: originalPost.userId,
			name: originalPost.name,
			username: originalPost.username,
			location: originalPost.location,
			body: originalPost.body,
			picturePath: originalPost.picturePath,
			avatar: originalPost.avatar,
			isRetweet: isQuoteRetweet ? false : true,
			originalPost: originalPost._id,
			retweeter: username,
			likes: {},
			comments: [],
			isQuoteRetweet,
			quoteBody,
		});

		const savedRetweet = await retweet.save();
		originalPost.retweetCount += 1;
		await originalPost.save();

		const retweetedPost = await Post.find();

		return res.status(201).json(retweetedPost);
	} catch (error) {
		console.error('Error creating retweet post:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const betPost = async (req, res) => {
	const { userId, body, selectedBet, tags, isParlay, payout, wager, odds } =
		req.body;

	console.log('odds' + odds);
	const user = await User.findById(userId);
	try {
		const newPost = new Post({
			userId,
			name: user.name,
			username: user.username,
			location: user.location,
			avatar: user.avatar,
			body,
			likes: {},
			comments: [],
			isBet: true,
		});

		if (isParlay) {
			const newParlay = new Parlay({
				userId,
				bets: selectedBet,
				totalWager: wager,
				potentialPayout: payout,
				tags,
				outcome: '',
				odds: odds,
			});
			await newParlay.save();
			newPost.betId = newParlay._id;
		}
		await newPost.save();

		const post = await Post.find();
		res.status(201).json(post);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

/* READ */
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { username } = req.params;
		const post = await Post.find({ username });
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { postId } = req.params;
		const post = await Post.findById({ _id: postId });
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getBet = async (req, res) => {
	try {
		const { betId } = req.params;
		const parlay = await Parlay.findById({ _id: betId });
		res.status(200).json(parlay);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/* UPDATE */
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/* DELETE */
export const deletePost = async (req, res) => {
	const { postId } = req.params;
	const { userId } = req.user;

	console.log(postId);

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// if (post.userId.toString() !== userId) {
		// 	return res
		// 		.status(403)
		// 		.json({ message: 'You are not authorized to delete this post' });
		// }

		await post.deleteOne({ _id: postId });

		const updatedPosts = await Post.find();
		res.status(200).json(updatedPosts);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
