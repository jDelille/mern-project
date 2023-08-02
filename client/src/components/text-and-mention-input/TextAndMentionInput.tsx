import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
// import { setPosts, setUsers } from "../../state";
import Avatar from "../../ui/avatar/Avatar";
import { User } from "types/@User.js";
import mentionsInputStyle from "./mentionsInputStyle";
import Button from "../../ui/button/Button";
import './TextAndMentionInput.scss';
import { AppState } from "types/@AppState";
import { setPosts } from "../../state";
import { Post } from "types/@Post";
import ImageUpload from "../../components/image-upload/ImageUpload";
import { FaWindowClose } from 'react-icons/fa'
import { HiGif } from 'react-icons/hi2'
interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 username?: string;
 avatar?: string;
 // isVerified?: boolean;
}

const TextAndMentionInput: React.FC = () => {

 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])

 const dispatch = useDispatch();
 const currentUser = useSelector((state: AppState) => state.user);
 const token = useSelector((state: AppState) => state.token);
 // const [post, setPost] = useState("");
 const [users, setUsers] = useState<User[]>()
 const [postBody, setPostBody] = useState("");
 const [image, setImage] = useState('');



 const getUsers = async () => {
  const response = await fetch("http://localhost:3001/users", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  setUsers(data);
  // dispatch(setUsers({ posts: data }))
 }

 useEffect(() => {
  getUsers();
 }, [])

 console.log(image)


 useEffect(() => {
  // Transform the usernames into SuggestionDataItem objects
  if (users) {
   const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? [])?.map((user) => ({
    id: user._id,
    display: user.username,
    avatar: user.avatar,
    name: user.name,
    // isVerified: user.isVerified
   }));
   setSuggestions(userSuggestions ?? []);

  }


 }, [users]);

 const handleOnChange = (
  event: { target: { value: string } },
 ) => {
  let value = event.target.value;
  value = value.replace(/@\[(\w+)\]\(\w+\)/g, '@$1');
  setPostBody(value);
 };

 const handleOnAdd = (id: string | number, display: string) => {
  const mentionText = `@${display}`;
  const newText = postBody.replace(/@(\w+)?$/, mentionText);
  setPostBody(newText)
 }

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
   <MentionsInput
    value={postBody}
    placeholder="What's on your mind?"
    onChange={(event) => {
     handleOnChange(event);
    }}
    style={mentionsInputStyle}
    inputRef={textareaRef}
    rows={1}
    className='textarea'
    allowSuggestionsAboveCursor={true}
    a11ySuggestionsListLabel={"Suggested mentions"}
   >
    <Mention
     trigger="@"
     onAdd={handleOnAdd}
     data={suggestions}
     appendSpaceOnAdd
     className='mention'
     displayTransform={(_, display) => `@${display}`}
     renderSuggestion={(data: ExtendedSuggestionDataItem) => (
      <div className='suggestion-box'>
       <Avatar src={data.avatar || '/images/placeholder.png'} alt="profile-picture" />
       <div className='display-name'>
        <span>@{data.display}</span>
       </div>
      </div>
     )}
    />
   </MentionsInput>
   {image && (
    <div className='image-preview'>
     <FaWindowClose color="white" size={20} onClick={() => setImage("")} />
     <img src={image} alt="image" />
    </div>
   )}
   {/* {!isGifOpen && (
    <Gifs />
   )} */}
   <div className="icon-bar">
    <ImageUpload onChange={setImage} value={image} isPost />
    <div className="icon"  >
     <HiGif size={26} color="#606984" />
    </div>
   </div>
   <Button actionLabel="Post" onClick={handlePost} isDisabled={postBody.length === 0} />

  </div>

 );
}

export default TextAndMentionInput;