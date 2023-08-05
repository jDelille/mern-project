import { useState, useEffect } from 'react';
import { Game } from 'types/@Game';
import { getTopGames } from '../../api/sportsData';
import MatchCard from '../../components/match-card/MatchCard';

import './SportsbookPage.scss';


const SportsBookPage: React.FC = () => {

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

 return (
  <div className="sportsbook-page">
   <div className='content'>
    {isLoading && (
     <div>Loading...</div>
    )}


    {matches.map((match) => (
     <MatchCard match={match} key={match.id} />
    ))}
   </div>

  </div>
 );
}

export default SportsBookPage;