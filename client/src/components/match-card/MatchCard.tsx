import { useState, useEffect } from 'react';
import { Game } from 'types/@Game';
import { Odds } from 'types/@Odds';
import { getMatchInfo, getOdds } from '../../api/sportsData';

import './MatchCard.scss';
import { useDispatch } from 'react-redux';
import { addBetToSlip } from '../../state';
import useBetModal from '../../hooks/useBetModal';

type Props = {
 match: Game
}

const MatchCard: React.FC<Props> = ({ match }) => {
 const dispatch = useDispatch();

 const [isLoading, setIsLoading] = useState(false)

 const [odds, setOdds] = useState<Odds[]>();
 const [matchInfo, setMatchInfo] = useState<Game>();

 const betModal = useBetModal();





 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const matchData = await getMatchInfo('baseball', 'mlb', match.id);
    setMatchInfo(matchData);
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false);
   }
  }

  fetchData();
 }, []);

 useEffect(() => {
  async function fetchOddsData() {
   try {
    if (matchInfo) {
     const oddsData = await getOdds(matchInfo.competitions[0].odds.$ref);
     setOdds(oddsData);
    }
   } catch (error) {
    console.log(error);
   }
  }

  fetchOddsData();
 }, [matchInfo]);

 const handleAddBet = (type: string, odds: number, team: string, abbreviation: string, location: string, logo: string, isFavorite: boolean) => {

  const selectedBet = {
   type,
   odds,
   teamName: team,
   logo,
   matchup: match.name,
   abbreviation,
   statusLink: matchInfo?.competitions[0].status?.$ref,
   homeScore: matchInfo?.competitions[0].competitors[0].score.$ref,
   awayScore: matchInfo?.competitions[0].competitors[1].score.$ref,
   location,
   isFavorite
  }

  betModal.onOpen();

  dispatch(addBetToSlip(selectedBet))
 }




 const lowerTeam = {
  name: match.competitions[0].competitors[0].team.name,
  longName: match.competitions[0].competitors[0].team.name,
  record: match.competitions[0].competitors[0].records?.[0].summary,
  score: match.competitions[0].competitors[0].score,
  imageAltText: 'logo',
  logoUrl: match.competitions[0].competitors[0].team.logo,
  id: match.competitions[0].competitors[0].team.id,
  abbrv: match.competitions[0].competitors[0].team.abbreviation,
 };

 const upperTeam = {
  name: match.competitions[0].competitors[1].team.name,
  longName: match.competitions[0].competitors[1].team.name,
  record: match.competitions[0].competitors[1].records?.[0].summary,
  score: match.competitions[0].competitors[1].score,
  imageAltText: 'logo',
  logoUrl: match.competitions[0].competitors[1].team.logo,
  id: match.competitions[0].competitors[1].team.id,
  abbrv: match.competitions[0].competitors[1].team.abbreviation,
 };

 const matchOdds = {
  details: odds?.[0].details,
  overOdds: odds?.[0].overOdds,
  overUnder: odds?.[0].overUnder,
  spread: odds?.[0].spread,
  underOdds: odds?.[0].underOdds,
  provider: odds?.[0].provider.name,
  homeTeam: {
   favorite: odds?.[0].homeTeamOdds.favorite,
   moneyLine: odds?.[0].homeTeamOdds.moneyLine,
  },
  awayTeam: {
   favorite: odds?.[0].awayTeamOdds.favorite,
   moneyLine: odds?.[0].awayTeamOdds.moneyLine,
  }
 }

 const status = match.status.type.detail

 return (
  <div className='match-card'>
   <div className='teams'>
    <div className="label">
     <p>{status}</p>
    </div>
    <div className='team'>
     <img
      src={upperTeam.logoUrl}
      alt={upperTeam.imageAltText}
     />
     <strong>{upperTeam.abbrv}</strong>
     <strong>{upperTeam.longName}</strong>
     <span>{upperTeam.record}</span>
    </div>
    <div className="team">
     <img
      src={lowerTeam.logoUrl}
      alt={lowerTeam.imageAltText}
     />
     <strong>{lowerTeam.abbrv}</strong>
     <strong>{lowerTeam.longName}</strong>
     <span>{lowerTeam.record}</span>

    </div>
   </div>

   <div className='odds'>
    <ul className='labels'>
     <li>Spread</li>
     <li>Total</li>
     <li>To Win</li>
    </ul>
    <div className='odds-list'>
     <ul>
      <li onClick={() => handleAddBet(
       'Spread',
       Number(matchOdds.spread),
       upperTeam.name,
       upperTeam.abbrv,
       'away',
       upperTeam.logoUrl,
       matchOdds.awayTeam.favorite as boolean
      )}
      >
       {matchOdds.awayTeam.favorite ? '-' : '+'}
       {matchOdds.spread}
      </li>
      <li>o{matchOdds.overUnder}</li>
      <li>
       {matchOdds.awayTeam.moneyLine}
      </li>
     </ul>
     <ul>
      <li onClick={() => handleAddBet(
       'Spread',
       Number(matchOdds.spread),
       lowerTeam.name,
       lowerTeam.abbrv,
       'home',
       lowerTeam.logoUrl,
       matchOdds.homeTeam.favorite as boolean
      )}>
       {matchOdds.homeTeam.favorite ? '-' : '+'}
       {matchOdds.spread}
      </li>
      <li>u{matchOdds.overUnder}</li>
      <li>
       {matchOdds.homeTeam.moneyLine}
      </li>
     </ul>

    </div>

   </div>
  </div>
 );
}

export default MatchCard;