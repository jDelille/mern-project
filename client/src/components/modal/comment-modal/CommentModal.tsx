import { useState, useMemo } from 'react';
import useCommentModal from "../../../hooks/useCommentModal";
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { setPost } from '../../../state';
import Avatar from '../../../ui/avatar/Avatar';
import { createdAtFormatter } from '../../../utils/date';
import { MdPhotoLibrary, MdPoll, MdGifBox } from 'react-icons/md'
import extractMentions from '../../../utils/extractMentions';

import './CommentModal.scss';

const CommentModal: React.FC = () => {

 const commentModal = useCommentModal();
 const dispatch = useDispatch();

 const [commentBody, setCommentBody] = useState('')

 const currentUser = useSelector((state: AppState) => state.user)
 const token = useSelector((state: AppState) => state.token)
 const postId = useSelector((state: AppState) => state.postId)
 const post = useSelector((state: AppState) => state.activePost)

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(post?.createdAt);
 }, [post?.createdAt]);

 const onClose = () => {
  commentModal.onClose();
 }

 const handleComment = async () => {
  if (currentUser) {
   const formData = new FormData();
   formData.append('userId', currentUser._id);
   formData.append('body', commentBody)
   try {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
     method: 'POST',
     headers: { Authorization: `Bearer ${token}` },
     body: formData
    })

    if (response.ok) {
     const data = await response.json();
     const { post } = data;
     dispatch(setPost({ post: post }));
    }
   } catch (error) {
    console.log('error', error)
   } finally {
    commentModal.onClose();
   }
  }
 }

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

 const renderedPostBody = renderPostBodyWithLinks(post?.body as string, mentionedUsernames);

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
   <div className='add-comment'>
    <Avatar src={currentUser?.avatar as string} alt='profile picture' />
    <textarea placeholder={`Reply to ${post?.username}`} onChange={(e) => setCommentBody(e.target.value)} />
   </div>
   <div className='attach-to-comment'>
    <span>Attach:</span>
    <div className='icons'>
     <div className='icon'>
      <MdPhotoLibrary color='#606984' size={30} />
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
   title='Reply'
   isOpen={commentModal.isOpen}
   onClose={onClose}
   onSubmit={handleComment}
   disableActionButton={!commentBody}
   body={bodyContent}
   actionLabel='Post'
   isComment
  />
 );
}

export default CommentModal;