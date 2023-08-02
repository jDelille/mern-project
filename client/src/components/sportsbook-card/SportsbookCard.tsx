import { Game } from "types/@Game";
import './SportsbookCard.scss';
import { useNavigate } from "react-router-dom";

type Props = {
 match: Game
}

const SportsbookCard: React.FC<Props> = ({ match }) => {

 const navigate = useNavigate();

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

 return (
  <div className="sportsbook-card" onClick={() => navigate(`/sportsbook/${match.id}`)}>

   <div className='content'>
    <div className='display-name'>
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
    <div className='info'>
     <div className='upper'>
      <strong className='score'>{upperTeam.score || 0}</strong>
     </div>
     <div className='lower'>
      <strong className='score'>{lowerTeam.score || 0}</strong>
     </div>
    </div>

   </div>

  </div>
 );
}

export default SportsbookCard;