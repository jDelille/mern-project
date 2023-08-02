import { useState, useEffect } from 'react';
import { Game } from 'types/@Game';
import { getMatchInfo } from '../../api/sportsData';
import { useParams } from 'react-router-dom';

import './MatchPage.scss';

const MatchPage: React.FC = () => {

 const [isLoading, setIsLoading] = useState(false)
 const [match, setMatch] = useState<Game>()

 const { matchId } = useParams();


 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true)
    const match = await getMatchInfo('baseball', 'mlb', matchId as string);
    setMatch(match)
    setIsLoading(false)
   } catch (error) {
    console.log(error)
   } finally {
    setIsLoading(false)
   }
  }

  fetchData();
 }, [])

 const lowerTeam = {
  name: match?.competitions[0].competitors[0].team.name,
  longName: match?.competitions[0].competitors[0].team.name,
  record: match?.competitions[0].competitors[0].records?.[0].summary,
  score: match?.competitions[0].competitors[0].score,
  imageAltText: 'logo',
  logoUrl: match?.competitions[0].competitors[0].team.logo,
  id: match?.competitions[0].competitors[0].team.id,
  abbrv: match?.competitions[0].competitors[0].team.abbreviation,
 };

 const upperTeam = {
  name: match?.competitions[0].competitors[1].team.name,
  longName: match?.competitions[0].competitors[1].team.name,
  record: match?.competitions[0].competitors[1].records?.[0].summary,
  score: match?.competitions[0].competitors[1].score,
  imageAltText: 'logo',
  logoUrl: match?.competitions[0].competitors[1].team.logo,
  id: match?.competitions[0].competitors[1].team.id,
  abbrv: match?.competitions[0].competitors[1].team.abbreviation,
 };


 return (
  <div className='match-page'>
   <div className='content'>
    <div className='match-header'>
     <h1>{match?.name}</h1>
     <div className='teams'>
      <div className='upper'>
       <img
        src={upperTeam.logoUrl}
        alt={upperTeam.imageAltText}
       />
       <strong>{upperTeam.abbrv}</strong>
      </div>
      <div className='lower'>
       <img
        src={lowerTeam.logoUrl}
        alt={lowerTeam.imageAltText}
       />
       <strong>{lowerTeam.abbrv}</strong>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default MatchPage;