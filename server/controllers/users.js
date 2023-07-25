import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
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
			({ _id, firstName, lastName, username, picturePath }) => {
				return { _id, firstName, lastName, username, picturePath };
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
			({ _id, firstName, lastName, username, picturePath }) => {
				return { _id, firstName, lastName, username, picturePath };
			}
		);

		res.status(200).json(formattedFollowing);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
