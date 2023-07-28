import { useState } from 'react';

import './Specialties.scss';

const Specialties: React.FC = () => {
 const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);

 const leagues = [
  {
   id: 0,
   name: 'NFL',
  },
  {
   id: 1,
   name: 'NBA',
  },
  {
   id: 2,
   name: 'NHL',
  },
  {
   id: 3,
   name: 'MLB',
  },
  {
   id: 4,
   name: 'MLS',
  },
  {
   id: 5,
   name: 'UFC',
  },
  {
   id: 6,
   name: 'GOLF',
  },
  {
   id: 7,
   name: 'NASCAR',
  },
 ];

 const handleSelectLeague = (league: string) => {
  const isLeagueSelected = selectedLeagues.includes(league);

  if (!isLeagueSelected) {
   setSelectedLeagues([...selectedLeagues, league]);
  } else {
   setSelectedLeagues(
    selectedLeagues.filter((selectedLeague) => selectedLeague !== league)
   );
  }
 };

 return (
  <div className='specialties'>
   {leagues.map((league) => (
    <div
     key={league.id}
     className={selectedLeagues.includes(league.name) ? 'selected-league' : 'league'}
     onClick={() => handleSelectLeague(league.name)}>
     <img src={`/images/${league.name}.png`} alt={`${league.name} Logo`} />
     {league.name}
    </div>
   ))}
  </div>
 );
};

export default Specialties;
