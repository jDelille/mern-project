import mongoose from 'mongoose';

const BetSchema = new mongoose.Schema({
	type: String,
	odds: Number,
	teamName: String,
	teamLogo: String,
	matchup: String,
	homeId: String,
	awayId: String,
	outcome: String,
	wager: Number,
	payout: Number,
	tags: [String],
});

const Bet = mongoose.model('Bet', BetSchema);

export default Bet;
