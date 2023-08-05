import { useState, useEffect } from 'react';
import { Game } from 'types/@Game';
import { getMatchInfo, getOdds, getPrediction, getScore, getTeam } from '../../api/sportsData';
import { useParams } from 'react-router-dom';
import { Team } from 'types/@Team';

import './MatchPage.scss';
import { Odds } from 'types/@Odds';
import { Predictions } from 'types/@Predictions';

const MatchPage: React.FC = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [match, setMatch] = useState<Game>();
 const [homeTeam, setHomeTeam] = useState<Team>();
 const [awayTeam, setAwayTeam] = useState<Team>();
 const [odds, setOdds] = useState<Odds[]>();
 const [homeScore, setHomeScore] = useState();
 const [awayScore, setAwayScore] = useState();
 const [prediction, setPrediction] = useState<Predictions>();

 const { matchId } = useParams();

 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const match = await getMatchInfo('football', 'nfl', matchId as string);
    setMatch(match);
    setIsLoading(false);

    const homeTeamData = await getTeam(
     match.competitions[0].competitors[0].team.$ref
    );
    setHomeTeam(homeTeamData);

    const awayTeamData = await getTeam(
     match.competitions[0].competitors[1].team.$ref
    );
    setAwayTeam(awayTeamData);

    const oddsData = await getOdds(match.competitions[0].odds.$ref);
    setOdds(oddsData);

    const homeScoreData = await getScore(
     match.competitions[0].competitors[0].score.$ref
    );
    setHomeScore(homeScoreData);

    const awayScoreData = await getScore(
     match.competitions[0].competitors[1].score.$ref
    );
    setAwayScore(awayScoreData);

    const predictionData = await getPrediction(match.competitions[0].predictor.$ref)
    setPrediction(predictionData)
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false);
   }
  }

  fetchData();
 }, []);

 // console.log(prediction);

 const matchHeader = {
  homeTeam: {
   id: homeTeam?.id,
   abbreviation: homeTeam?.abbreviation,
   logo: homeTeam?.logos[2].href,
   name: homeTeam?.name,
   score: homeScore?.value,
   favorite: odds?.[0].homeTeamOdds.favorite,
   moneyLine: odds?.[0].homeTeamOdds.moneyLine,
  },
  awayTeam: {
   id: awayTeam?.id,
   abbreviation: awayTeam?.abbreviation,
   logo: awayTeam?.logos[2].href,
   name: awayTeam?.name,
   score: awayScore?.value,
   favorite: odds?.[0].awayTeamOdds.favorite,
   moneyLine: odds?.[0].awayTeamOdds.moneyLine,
  },
  odds: {
   details: odds?.[0].details,
   overOdds: odds?.[0].overOdds,
   overUnder: odds?.[0].overUnder,
   spread: odds?.[0].spread,
   underOdds: odds?.[0].underOdds,
   provider: odds?.[0].provider.name,
  },
  predictions: {
   homeTeam: {
    winProbability: {
     description: prediction?.awayTeam.statistics[2].description,
     displayName: prediction?.awayTeam.statistics[2].displayName,
    }
   }
  }
 };

 return (
  <div className='match-page'>
   <div className='content'>
    <div className='match-header'>
     <div className='path'>
      <a href='/sportsbook'>MLB</a>
      <span>{'>'}</span>
      <p>{match?.name}</p>
     </div>
     <div className='teams'>
      <div className='away'>
       <div className='display'>
        <img src={matchHeader.awayTeam?.logo} />
        <strong>{matchHeader.awayTeam?.name}</strong>
       </div>
       <div className='score'>
        <strong>{matchHeader.awayTeam.score}</strong>
       </div>
      </div>
      <div className='status'>
       <p>BOT 7</p>
       <p>3-1, 0 Outs</p>
       <strong>MLBN</strong>
      </div>
      <div className='home'>
       <div className='score'>
        <strong>{matchHeader.homeTeam.score}</strong>
       </div>
       <div className='display'>
        <img src={matchHeader.homeTeam?.logo} />
        <strong>{matchHeader.homeTeam?.name}</strong>
       </div>
      </div>
     </div>
    </div>

    <div className='odds'>
     <strong>Match Odds</strong>
     <div className='labels'>
      <span>Team</span>
      <ul>
       <li>Spread</li>
       <li>Total</li>
       <li>To Win</li>
      </ul>
     </div>
     <div className='teams'>
      <div className='home'>
       <strong>
        {matchHeader.homeTeam.abbreviation} {matchHeader.homeTeam.name}
       </strong>
       <div className='odds-data'>
        <ul>
         <li>
          {matchHeader.homeTeam.favorite ? 'o' : 'u'}
          {matchHeader.odds.spread}
         </li>
         <li>o{matchHeader.odds.overUnder}</li>
         <li>
          {matchHeader.homeTeam.favorite ? '-' : '+'}
          {matchHeader.homeTeam.moneyLine}
         </li>
        </ul>
       </div>
      </div>
      <div className='away'>
       <strong>
        {matchHeader.awayTeam.abbreviation} {matchHeader.awayTeam.name}
       </strong>
       <div className='odds-data'>
        <ul>
         <li>
          {matchHeader.awayTeam.favorite ? 'o' : 'u'}
          {matchHeader.odds.spread}
         </li>
         <li>u{matchHeader.odds.overUnder}</li>
         <li>
          {matchHeader.awayTeam.favorite ? '-' : '+'}
          {matchHeader.homeTeam.moneyLine}
         </li>
        </ul>
       </div>
      </div>
     </div>
    </div>
    <div className='predictions'>
     <strong className='section-label'>Match Predictions</strong>
     <div className='prediction'>
      <strong>{matchHeader.predictions.homeTeam.winProbability.displayName}</strong>
      <span>{matchHeader.predictions.homeTeam.winProbability.description}</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MatchPage;
