import { useState, useEffect } from 'react';
import { Game } from 'types/@Game';
import { getTopGames } from '../../api/sportsData';
import SportsbookCard from '../../components/sportsbook-card/SportsbookCard';
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
   <div className='sports'>
    <ul>
     <li>MLB</li>
     <li>NFL</li>
     <li>NBA</li>
     <li>MLS</li>
     <li>NHL</li>
     <li>UFC</li>
    </ul>
   </div>
   <div className='content'>
    {isLoading && (
     <div>Loading...</div>
    )}


    {matches.map((match) => (
     <SportsbookCard match={match} />
    ))}
   </div>

  </div>
 );
}

export default SportsBookPage;