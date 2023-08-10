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
 const betModal = useBetModal();

 const [isLoading, setIsLoading] = useState(false)
 const [odds, setOdds] = useState<Odds[]>();
 const [matchInfo, setMatchInfo] = useState<Game>();


 console.log(odds)

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

 const handleAddBet = (type: string, value: number, odds: number, team: string, abbreviation: string, location: string, logo: string, isFavorite: boolean) => {

  const selectedBet = {
   type,
   value,
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

 const homeTeam = match.competitions[0].competitors[0]
 const awayTeam = match.competitions[0].competitors[1]

 const lowerTeam = {
  name: homeTeam.team.name,
  longName: homeTeam.team.name,
  record: homeTeam.records?.[0].summary,
  score: homeTeam.score,
  imageAltText: 'logo',
  logoUrl: homeTeam.team.logo,
  id: homeTeam.team.id,
  abbrv: homeTeam.team.abbreviation,
 };

 const upperTeam = {
  name: awayTeam.team.name,
  longName: awayTeam.team.name,
  record: awayTeam.records?.[0].summary,
  score: awayTeam.score,
  imageAltText: 'logo',
  logoUrl: awayTeam.team.logo,
  id: awayTeam.team.id,
  abbrv: awayTeam.team.abbreviation,
 };

 const matchOdds = {
  details: odds?.[odds?.length - 1].details,
  overOdds: odds?.[odds?.length - 1].overOdds,
  overUnder: odds?.[odds?.length - 1].overUnder,
  spread: odds?.[odds?.length - 1].spread,
  underOdds: odds?.[odds?.length - 1].underOdds,
  provider: odds?.[odds?.length - 1].provider.name,
  homeTeam: {
   favorite: odds?.[odds?.length - 1].homeTeamOdds.favorite,
   moneyLine: odds?.[odds?.length - 1].homeTeamOdds.moneyLine,
   spreadOdds: odds?.[odds?.length - 1].homeTeamOdds.spreadOdds
  },
  awayTeam: {
   favorite: odds?.[odds?.length - 1].awayTeamOdds.favorite,
   moneyLine: odds?.[odds?.length - 1].awayTeamOdds.moneyLine,
   spreadOdds: odds?.[odds?.length - 1].awayTeamOdds.spreadOdds
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
     <li>To Win</li>
     <li>Spread</li>
     <li>Total</li>
    </ul>
    <div className='odds-list'>
     <ul>
      <li className='odd'>
       {matchOdds.awayTeam.moneyLine}
      </li>
      <li
       onClick={() => handleAddBet(
        'Spread',
        Number(matchOdds.spread),
        Number(matchOdds.awayTeam.spreadOdds),
        upperTeam.name,
        upperTeam.abbrv,
        'away',
        upperTeam.logoUrl,
        matchOdds.awayTeam.favorite as boolean,
       )}
      >
       <span>{matchOdds.spread}</span>
       <span className='odd'>{matchOdds.awayTeam.spreadOdds}</span>
      </li>
      <li>
       <span>u{matchOdds.overUnder}</span>
       <span className='odd'>{matchOdds.underOdds}</span>
      </li>

     </ul>
     <ul>

      <li className='odd'>
       {matchOdds.homeTeam.moneyLine}
      </li>
      <li onClick={() => handleAddBet(
       'Spread',
       Number(matchOdds.spread),
       Number(matchOdds.homeTeam.spreadOdds),
       lowerTeam.name,
       lowerTeam.abbrv,
       'home',
       lowerTeam.logoUrl,
       matchOdds.homeTeam.favorite as boolean,
      )}>
       <span>{matchOdds.spread}</span>
       <span className='odd'>{matchOdds.homeTeam.spreadOdds}</span>
      </li>

      <li>
       <span>o{matchOdds.overUnder}</span>
       <span className='odd'>{matchOdds.underOdds}</span>
      </li>
     </ul>

    </div>

   </div>
  </div>
 );
}

export default MatchCard;