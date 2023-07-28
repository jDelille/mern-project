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

/* REGISTER USER */
export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			username,
			picturePath,
			specialties,
			location,
			followers,
			following,
			bio,
		} = req.body;

		console.log(email);

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			username,
			picturePath,
			followers,
			following,
			specialties,
			location,
			bio,
			viewedProfile: 0,
			impressions: 0,
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
