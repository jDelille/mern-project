import { useEffect, useState } from 'react';
import { Parlay } from 'types/@Parlay';
import { getGameStatus, getScore } from '../../../../api/checkBet';
import { Bet } from 'types/@Bet';
import checkSpread from '../../../../utils/checkBet';
import './PostCardParlay.scss';

type Props = {
  parlay: Parlay
}


const PostCardParlay: React.FC<Props> = ({ parlay }) => {

  const [bets, setBets] = useState<Bet[]>([])

  useEffect(() => {
    async function fetchAndUpdateBets() {
      if (parlay && parlay.outcome === "") {
        const updatedBets = await Promise.all(parlay.bets.map(fetchGameStatus));

        const filteredBets = updatedBets.filter(bet => bet !== null);
        setBets(filteredBets as Bet[]);

        const allBetsCompleted = filteredBets.every(bet => bet?.isCompleted);
        const someBetsCompleted = filteredBets.some(bet => bet?.isCompleted);
        if (someBetsCompleted || allBetsCompleted) {
          const allBetsWon = filteredBets.every(bet => bet?.isWinner);
          const updatedOutcome = allBetsWon ? 'win' : 'loss';
          if (parlay.outcome === '' && allBetsCompleted) {

            await updateParlayOutcome(parlay._id, updatedOutcome);
          }

          await updateIndividualBet(parlay._id, filteredBets as Bet[]);

        }
      }
    }

    fetchAndUpdateBets();
  }, [parlay]);

  async function fetchGameStatus(bet: Bet) {
    try {
      const response = await getGameStatus(bet.statusLink);
      const homeScore = await getScore(bet.homeScore);
      const awayScore = await getScore(bet.awayScore);

      const updatedBet = {
        ...bet,
        isCompleted: response.type.completed,
        homeScore: homeScore.value,
        awayScore: awayScore.value,
        isWinner: true,
      };

      if (bet.type === 'Spread' && updatedBet.isCompleted) {
        updatedBet.isWinner = checkSpread(bet.value, homeScore, awayScore, bet.location, bet.isFavorite) || false;
      }

      return updatedBet;
    } catch (error) {
      console.error(error);
      return null; // Returning null for failed bets
    }
  }

  async function updateIndividualBet(parlayId: string, updatedBets: Bet[]) {
    try {
      const res = await fetch(`http://localhost:3001/bets/${parlayId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bets: updatedBets }),
      });

      const updatedParlay = await res.json();
      console.log(updatedParlay);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateParlayOutcome(parlayId: string, updatedOutcome: string) {
    try {
      // Update the parlay outcome in the database
      const res = await fetch(`http://localhost:3001/bets/${parlayId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outcome: updatedOutcome }),
      });

      const updatedParlay = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  if (!parlay) {
    return null;
  }

  const parlayBets = parlay?.bets;
  const header = parlayBets.length > 1 ? `${parlayBets.length}-Leg Parlay` : 'Single Bet';
  const isWinningParlay = parlay.outcome === 'win';
  const isLosingParlay = parlay.outcome === 'loss';

  const winCount = parlay.bets.filter(bet => bet.isWinner).length;
  const lossCount = parlay.bets.filter(bet => !bet.isWinner).length;
  const openCount = parlay.bets.filter(bet => !bet.isCompleted).length;

  return (
    <ul className='parlay'>
      <div className='header'>
        <div className="text">
          <h3>{header}</h3>
          <div>{parlay.odds}</div>
          <div>${parlay.potentialPayout}</div>
          <div>${parlay.totalWager}</div>
          <div className='win-loss-count'>
            {winCount > 0 && (
              <span>{winCount} win{winCount > 1 ? 's' : ''}</span>
            )}
            {winCount > 0 && lossCount > 0 && (
              <span> - </span>
            )}
            {lossCount > 0 && (
              <span>{lossCount} loss{lossCount > 1 ? 'es' : ''}</span>
            )}
            {openCount > 0 && (
              <span>{openCount} open</span>
            )}
          </div>

        </div>

      </div>
      {parlayBets.map((bet) => (
        <li className={bet.isCompleted ? (bet.isWinner ? 'bet-won' : 'bet-loss') : 'bet'}>
          <div className='display-name'>
            <img src={bet.logo} alt="logo" />
            <h3>{bet.abbreviation} {bet.teamName} • {bet.type} {bet.isFavorite ? '-' : '+'}{bet.value}</h3>
          </div>

          <span>{bet.matchup}</span>
        </li>
      ))
      }

    </ul >
  );
}

export default PostCardParlay;