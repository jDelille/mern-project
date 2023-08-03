import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "types/@AppState";
import ImageUpload from "../../components/image-upload/ImageUpload";
import { HiGif } from 'react-icons/hi2'
import TextAndMentionInput from "../../components/text-and-mention-input/TextAndMentionInput";
import './CreatePost.scss';
import Button from "../../ui/button/Button";
import { setPosts } from "../../state";
import { Post } from "types/@Post";


const CreatePost = () => {

 const dispatch = useDispatch();
 const currentUser = useSelector((state: AppState) => state.user);
 const token = useSelector((state: AppState) => state.token);

 const [postBody, setPostBody] = useState<string>("");
 const [image, setImage] = useState('');

 const handlePost = async () => {

  if (currentUser) {
   const formData = new FormData();
   formData.append('userId', currentUser._id);
   formData.append('body', postBody);

   if (image) {
    formData.append('picture', image);
    formData.append('picturePath', image);
   }

   const response = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
   })



   const posts = await response.json();
   posts.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
   dispatch(setPosts({ posts }));
   setImage('');
   setPostBody("");
  }


 }

 return (
  <div className="create-post-container">
   <TextAndMentionInput postBody={postBody} setPostBody={setPostBody} image={image} setImage={setImage} placeholder={"What's on your mind?"} />
   <div className="icon-bar">
    <ImageUpload onChange={setImage} value={image} isPost />
    <div className="icon"  >
     <HiGif size={26} color="#606984" />
    </div>
    <div className="post-body-count">
     <p>{500 - postBody.length}</p>
    </div>
   </div>
   <Button actionLabel="Post" onClick={handlePost} isDisabled={postBody.length === 0} />
  </div>
 );
}

export default CreatePost;