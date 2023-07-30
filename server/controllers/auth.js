import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* VALIDATE EMAIL */
export const validateEmail = async (req, res) => {
	try {
		const { email } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.json({ exists: true });
		}

		res.json({ exists: false });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/* VALIDATE USERNAME */
export const validateUsername = async (req, res) => {
	try {
		const { username } = req.body;

		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.json({ exists: true });
		}

		res.json({ exists: false });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/* REGISTER USER */
export const register = async (req, res) => {
	try {
		const {
			name,
			email,
			password,
			username,
			avatar,
			location,
			followers,
			following,
			specialties,
			bio,
		} = req.body;

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: passwordHash,
			username,
			avatar,
			followers,
			following,
			location,
			specialties,
			bio,
		});

		const savedUser = await newUser.save();
		res.status((201).json(savedUser));
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/* LOGIN USER */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email: email,
		});

		if (!user) {
			return res.status(400).json({ message: 'User does not exist.' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials.' });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		delete user.password;

		res.status(200).json({ token, user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
