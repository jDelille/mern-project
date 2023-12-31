import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { clearBetSlip } from '../../state';
import './BetSlip.scss';

const BetSlip: React.FC = () => {

 const dispatch = useDispatch();

 const bet = useSelector((state: AppState) => state.betSlip)

 const handleClearBet = () => {
  dispatch(clearBetSlip())
 }

 return (
  <div className='bet-slip'>
   <div className='header'>
    <strong>Bet Slip</strong>
    <span onClick={handleClearBet}>Clear All</span>
   </div>
   <div className='bets'>
    <div className='bet'>
     <p>{bet.team} • {bet.type}</p>
     <span>{bet.matchup}</span>
     <div className='stake'>
      <strong>{bet.odds}</strong>
     </div>
    </div>

   </div>
  </div>
 );
}

export default BetSlip;