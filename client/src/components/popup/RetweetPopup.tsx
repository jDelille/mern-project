import { useDispatch, useSelector } from 'react-redux';
import useRetweetPopup from '../../hooks/useRetweetPopup';
import Popup from './Popup';
import { AppState } from 'types/@AppState';
import { setPost, setPosts } from '../../state';
import { Post } from 'types/@Post';
import Button from '../../ui/button/Button';
import useQuoteRetweetModal from '../../hooks/useQuoteRetweetModal';


const RetweetPopup = () => {

 const retweetPopup = useRetweetPopup();
 const quoteRetweetModal = useQuoteRetweetModal();
 const token = useSelector((state: AppState) => state.token)
 const post = useSelector((state: AppState) => state.activePost)
 const currentUser = useSelector((state: AppState) => state.user)
 const dispatch = useDispatch();

 const getPosts = async () => {
  const response = await fetch("http://localhost:3001/posts", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  dispatch(setPosts({ posts: data }));
 };

 const handleRetweet = async () => {
  try {
   const response = await fetch(`http://localhost:3001/posts/${post?._id}/retweet`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
     username: currentUser?.username
    }),
   })

   const data = await response.json();
   dispatch(setPost({ post: data }))
   getPosts();
   retweetPopup.onClose();

  } catch (error) {
   console.log(error)
  }
 }

 const openQuoteRetweetModal = () => {
  quoteRetweetModal.onOpen();
 }



 const bodyContent = (
  <div>
   <Button actionLabel='Retweet' onClick={handleRetweet} />
   <Button actionLabel='Quote Retweet' onClick={openQuoteRetweetModal} />
  </div>
 )
 return (
  <Popup body={bodyContent} isOpen={retweetPopup.isOpen} onClose={retweetPopup.onClose} title='Retweet' />
 );
}

export default RetweetPopup;