import Parlay from '../models/Parlay.js';

/* UPDATE */
export const updateBetOutcome = async (req, res) => {
	try {
		const { parlayId } = req.params;
		const { outcome, bets } = req.body;
		const parlay = await Parlay.findById({ _id: parlayId });

		console.log(bets);
		const updatedParlay = await Parlay.findByIdAndUpdate(parlayId, {
			outcome: outcome,
			bets: bets,
		});

		res.status(200).json(updatedParlay);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
