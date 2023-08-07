import mongoose from 'mongoose';

const ParlaySchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	bets: [],
	totalWager: Number,
	potentialPayout: Number,
	tags: [String],
	outcome: String,
});

const Parlay = mongoose.model('Parlay', ParlaySchema);

export default Parlay;
