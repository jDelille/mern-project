import { Parlay } from 'types/@Parlay';
import './PostCardParlay.scss';

type Props = {
 parlay: Parlay
}


const PostCardParlay: React.FC<Props> = ({ parlay }) => {
 if (!parlay) {
  return null;
 }
 return (
  <div className='parlay'>
   <div className='header'>
    <div className='info'>
     <strong>{parlay.bets.length}-Leg Parlay</strong>
     <span>4 open</span>
    </div>

    <div className='odds'>
     <strong>${parlay.totalWager}</strong>
     <strong>${parlay.potentialPayout}</strong>
    </div>
   </div>
   {parlay?.bets?.map((bet) => (
    <div className='bet'>
     <strong>{bet.abbreviation} {bet.teamName} • {bet.type} {bet.odds}</strong>
     <span>{bet.matchup}</span>
     <div className='odds'>
      <strong></strong>
     </div>
    </div>
   ))}
  </div>
 );
}

export default PostCardParlay;