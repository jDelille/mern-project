import Parlay from '../models/Parlay.js';

/* UPDATE */
export const updateBetOutcome = async (req, res) => {
	try {
		const { parlayId } = req.params;
		const { outcome } = req.body;
		const parlay = await Parlay.findById({ _id: parlayId });

		const updatedParlay = await Parlay.findByIdAndUpdate(parlayId, {
			outcome: '',
		});

		res.status(200).json(updatedParlay);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
