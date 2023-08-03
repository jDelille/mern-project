import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useQuoteRetweetModal from "../../../hooks/useQuoteRetweetModal";
import Modal from "../Modal";
import { AppState } from "types/@AppState";
import Avatar from "../../../ui/avatar/Avatar";
import TextAndMentionInput from "../../../components/text-and-mention-input/TextAndMentionInput";
import extractMentions from "../../../utils/extractMentions";
import { createdAtFormatter } from "../../../utils/date";
import ImageUpload from '../../../components/image-upload/ImageUpload';
import { MdPoll, MdGifBox } from 'react-icons/md'
import { setPost, setPosts } from '../../../state';
import { Post } from 'types/@Post';
import './QuoteRetweetModal.scss';
import useRetweetPopup from '../../../hooks/useRetweetPopup';

const QuoteRetweetModal = () => {

 const dispatch = useDispatch();
 const quoteRetweetModal = useQuoteRetweetModal();
 const retweetPopup = useRetweetPopup();

 const [quoteBody, setQuoteBody] = useState('');
 const [image, setImage] = useState('')

 const currentUser = useSelector((state: AppState) => state.user)
 const token = useSelector((state: AppState) => state.token)
 // const postId = useSelector((state: AppState) => state.postId)
 const post = useSelector((state: AppState) => state.activePost)

 const mentionedUsernames = extractMentions(post?.body as string);

 const renderPostBodyWithLinks = (postBody: string, mentionedUsernames: string[]) => {
  const parts = postBody?.split(/(@\w+)/g);

  return parts?.map((part, index) => {
   if (mentionedUsernames.includes(part.slice(1))) {
    return (
     <a href={`/profile/${part.slice(1)}`} key={index} className='tagged-username'>
      {part}
     </a>
    );
   } else {
    return <span key={index}>{part}</span>;
   }
  });
 };

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(post?.createdAt);
 }, [post?.createdAt]);

 const renderedPostBody = renderPostBodyWithLinks(post?.body as string, mentionedUsernames);

 const onClose = () => {
  quoteRetweetModal.onClose();
  setQuoteBody('');
 }

 const getPosts = async () => {
  const response = await fetch("http://localhost:3001/posts", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  dispatch(setPosts({ posts: data }));
 };

 const handleQuoteRetweet = async () => {
  try {
   const response = await fetch(`http://localhost:3001/posts/${post?._id}/retweet`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
     username: currentUser?.username,
     isQuoteRetweet: true,
     quoteBody
    }),
   })

   const data = await response.json();
   dispatch(setPost({ post: data }))
   getPosts();
   quoteRetweetModal.onClose();
   retweetPopup.onClose();

  } catch (error) {
   console.log(error)
  }
 }


 const bodyContent = (
  <div className='body-content'>
   <div className='post-preview'>
    <div className='line'></div>
    <div className='post-preview-header'>
     <Avatar src={post?.avatar as string} alt='profile picture' />
     <div className='display-name'>
      <strong>{post?.username}</strong>
      <span>{postCreationDate} ago</span>
     </div>
    </div>
    <p className='body'>{renderedPostBody}</p>
   </div>
   <div className='add-quote'>
    <Avatar src={currentUser?.avatar as string} alt='profile picture' />
    <TextAndMentionInput postBody={quoteBody} setPostBody={setQuoteBody} image={image} setImage={setImage} placeholder={`Reply to ${post?.username}`} isComment />
    {/* {image && (
     <div className='image-preview'>
      <img src={image} alt="image" />
     </div>
    )} */}
   </div>
   <div className='attach-to-comment'>
    <span>Attach:</span>
    <div className='icons'>
     <div className='icon'>
      <ImageUpload onChange={setImage} value={image} isComment />
      <span>Photo</span>
     </div>
     <div className='icon'>
      <MdPoll color='#606984' size={30} />
      <span>Poll</span>
     </div>
     <div className='icon'>
      <MdGifBox color='#606984' size={30} />
      <span>Gif</span>
     </div>
    </div>
   </div>
  </div>
 )

 return (
  <Modal
   title='Quote Retweet'
   isOpen={quoteRetweetModal.isOpen}
   onClose={onClose}
   onSubmit={handleQuoteRetweet}
   disableActionButton={!quoteBody}
   body={bodyContent}
   actionLabel='Post'
   isComment
  />
 );
}

export default QuoteRetweetModal;