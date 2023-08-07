import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username });
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(404).json({ message: 'Server error' });
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (users) {
			res.status(200).json(users);
		} else {
			res.status(404).json({ message: 'Users not found' });
		}
	} catch (error) {
		res.status(404).json({ message: 'Server error' });
	}
};

export const getRecommendedUsers = async (req, res) => {
	try {
		const { id } = req.params;

		const recommendedUsers = await User.find({ _id: { $ne: id } }).limit(5);
		if (recommendedUsers) {
			res.status(200).json(recommendedUsers);
		} else {
			res.status(404).json({ message: 'Users not found' });
		}
	} catch (error) {
		res.status(404).json({ message: 'Server error' });
	}
};

export const getUserFollowing = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const following = await Promise.all(
			user.following.map((id) => User.findById(id))
		);

		const formattedFollowing = following.map(
			({ _id, name, username, avatar }) => {
				return { _id, name, username, avatar };
			}
		);

		res.status(200).json(formattedFollowing);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/* UPDATE */

export const addRemoveFollowing = async (req, res) => {
	try {
		const { id, followingId } = req.params;
		const user = await User.findById(id);
		const follow = await User.findById(followingId);

		if (user.following.includes(followingId)) {
			user.following = user.followings.filter((id) => id !== followId);
			follow.followers = follow.followers.filter((id) => id !== id);
		} else {
			user.following.push(followId);
			follow.followers.push(id);
		}

		await user.save();
		await follow.save();

		const following = await Promise.all(
			user.following.map((id) => User.findById(id))
		);

		const formattedFollowing = following.map(
			({ _id, name, username, avatar }) => {
				return { _id, name, username, avatar };
			}
		);

		res.status(200).json(formattedFollowing);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
