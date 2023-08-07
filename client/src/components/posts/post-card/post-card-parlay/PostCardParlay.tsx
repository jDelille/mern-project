import { useEffect, useState } from 'react';
import { Parlay } from 'types/@Parlay';
import { getGameStatus, getScore } from '../../../../api/checkBet';
import checkSpread from '../../../../utils/checkBet';
import './PostCardParlay.scss';

type Props = {
  parlay: Parlay
}


const PostCardParlay: React.FC<Props> = ({ parlay }) => {

  const [bets, setBets] = useState([])

  async function fetchStatus() {
    if (parlay.outcome !== '') {
      return;
    }

    if (parlay && parlay.bets) {
      for (const bet of parlay.bets) {
        try {
          const response = await getGameStatus(bet.statusLink);
          if (response.type.completed) {
            console.log(true)
          } else {
            console.log(false)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  async function fetchScores() {
    if (parlay.outcome !== '') {
      return;
    }

    if (parlay && parlay.bets) {
      for (const bet of parlay.bets) {
        try {
          const homeScore = await getScore(bet.homeScore);
          const awayScore = await getScore(bet.awayScore)
          console.log('homescore: ', homeScore.value)
          console.log('awayscore: ', awayScore.value)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  async function checkAndUpdateParlay() {
    let allOutcomesTrue = true;

    for (const bet of bets) {
      if (!bet.outcome) {
        allOutcomesTrue = false;
        break;
      }
    }

    const updatedOutcome = allOutcomesTrue ? 'win' : 'loss';
    const id = parlay._id
    const res = await fetch(`http://localhost:3001/bets/${id}/update`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ outcome: updatedOutcome })
    })

    const updatedParlay = await res.json();
  }

  useEffect(() => {
    fetchStatus();
    fetchScores();
  }, [])


  if (!parlay) {
    return null;
  }


  const testing = bets || parlay?.bets

  return (
    <div className='parlay'>
      <div className='header'>
        <div className='info'>
          <strong>{parlay?.bets.length}-Leg Parlay</strong>
          <span>4 open</span>
        </div>

        <div className='odds'>
          <strong>${parlay?.totalWager}</strong>
          <strong>${parlay?.potentialPayout}</strong>
        </div>
      </div>
      {/* {testing.map((bet) => (
        <div className={bet.outcome ? 'bet-won' : 'bet'} key={bet._id}>
          <strong>{bet.abbreviation} {bet.teamName} • {bet.type} {bet.odds}</strong>
          <p>{bet.status.type.description}</p>
          <span>{bet.matchup}</span>
          <div className='odds'>
            <strong></strong>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default PostCardParlay;