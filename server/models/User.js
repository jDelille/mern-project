import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		username: {
			type: String,
			required: true,
			min: 2,
			max: 50,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		avatar: {
			type: String,
			default: '',
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		specialties: {
			type: Array,
			default: [],
		},
		location: String,
		bio: String,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
