import { useEffect, useState } from 'react';

import './Gamebar.scss';
import { getTopGames } from '../../api/sportsData';
import { Game } from 'types/@Game';
import GameCard from './game-card/GameCard';

const Gamebar: React.FC = () => {

 const [isLoading, setIsLoading] = useState(false)
 const [matches, setMatches] = useState<Game[]>([])

 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true)
    const matches = await getTopGames('baseball', 'mlb');
    setMatches(matches.events)
    setIsLoading(false)
   } catch (error) {
    console.log(error)
   } finally {
    setIsLoading(false)
   }
  }

  fetchData();
 }, [])

 console.log(matches)

 return (
  <div className='gamebar'>
   {matches.map((match) => (
    <GameCard key={match.id} match={match} />
   ))}

  </div>
 );
}

export default Gamebar;