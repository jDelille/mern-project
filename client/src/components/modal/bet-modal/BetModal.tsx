import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBetModal from '../../../hooks/useBetModal';
import { AppState } from 'types/@AppState';
import Modal from '../Modal';
import { removeBetFromSlip, setPost } from '../../../state';
import './BetModal.scss';
import TextAndMentionInput from '../../../components/text-and-mention-input/TextAndMentionInput';

const BetModal = () => {
 const betModal = useBetModal();
 const dispatch = useDispatch();

 const currentUser = useSelector((state: AppState) => state.user);
 const token = useSelector((state: AppState) => state.token);
 const bet = useSelector((state: AppState) => state.betSlip);

 const [betBody, setBetBody] = useState<string>('');
 const [image, setImage] = useState('');
 const [selectedTags, setSelectedTags] = useState<string[]>([])
 const [wager, setWager] = useState<number>(0);
 const [payout, setPayout] = useState<number>(0)

 const onClose = () => {
  betModal.onClose();
 };

 const handlePlaceBet = async () => {
  if (currentUser) {
   try {
    const response = await fetch(`http://localhost:3001/posts/bet`, {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      userId: currentUser._id,
      body: betBody,
      selectedBet: bet,
      tags: selectedTags,
      wager: 100,
      payout: 1000,
      isParlay: true
     }),
    })
    if (response.ok) {
     const data = await response.json();
     dispatch(setPost({ post: data }));
    }
   } catch (error) {
    console.log(error)
   }
  }

 };

 const handleRemoveBet = (betIndex: number) => {
  dispatch(removeBetFromSlip(betIndex));
 };

 useEffect(() => {
  if (bet.length === 0) {
   betModal.onClose();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [bet.length]);

 const tags = [
  'Easy Money',
  'Optimistic',
  'Risky',
  'Confident',
  'Expert Opinion',
  'Lock of the day',
  'Favorite',
  'Underdog',
  'Sleeper',
  'Data Driven',
  'Public Opinion',
  'Statistical Edge',
  'Research Based',
  'High Stakes',
 ]

 const handleTagClick = (tag: string) => {
  if (selectedTags.includes(tag)) {
   setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  } else {
   setSelectedTags([...selectedTags, tag]);
  }
 };

 const bodyContent = (
  <>
   <div className='bets'>
    {bet.map((data, i) => (
     <div className='bet' key={i}>
      <div className='bet-data'>
       <strong onClick={() => handleRemoveBet(i)}>remove</strong>
       <p>
        {data.teamName} • {data.type}
       </p>
       <span>{data.matchup}</span>
       <div className='stake'>
        <strong>{data.odds}</strong>
       </div>
      </div>
      {bet.length === 1 && (
       <div className='bet-wager'>
        <input type='number' placeholder='0.00' />
        <div className='payout'>
         <span>Payout:</span>
         <span>$14000</span>
        </div>
       </div>
      )}

     </div>
    ))}
   </div>
   <div className='body'>
    <TextAndMentionInput
     postBody={betBody}
     setPostBody={setBetBody}
     image={image}
     setImage={setImage}
     placeholder={`What's your take?`}
    />
   </div>
   <ul className='tags-container'>
    <strong>Tags</strong>
    <div className='tags'>
     {tags.map((tag) => (
      <li
       key={tag}
       onClick={() => handleTagClick(tag)}
       className={selectedTags.includes(tag) ? 'selected-tag' : 'tag'}
      >
       {tag}
      </li>
     ))}
    </div>

   </ul>
  </>
 );

 return (
  <Modal
   title={`Bets ${bet.length}`}
   isOpen={betModal.isOpen}
   onClose={onClose}
   body={bodyContent}
   actionLabel='Place Bet'
   onSubmit={handlePlaceBet}
   isComment
   secondaryAction={onClose}
   secondaryActionLabel='Add another bet'
  />
 );
};

export default BetModal;
