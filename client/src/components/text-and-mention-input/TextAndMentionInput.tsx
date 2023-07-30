import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mention, MentionItem, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions'
import { setPosts, setUsers } from "../../state";
import Avatar from "../../ui/avatar/Avatar";
import { User } from "types/@User.js";
import mentionsInputStyle from "./mentionsInputStyle";
import Button from "../../ui/button/Button";
import './TextAndMentionInput.scss';

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 username?: string;
 picturePath?: string;
 // isVerified?: boolean;
}

const TextAndMentionInput: React.FC = () => {

 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])

 const dispatch = useDispatch();
 const currentUser = useSelector((state) => state.user);
 const token = useSelector((state) => state.token);
 const [post, setPost] = useState("");
 const [users, setUsers] = useState<User[]>()
 const [postBody, setPostBody] = useState("");

 const {
  _id,
  firstName,
  lastName,
  username,
  location,
  viewedProfile,
  followers,
  following,
  impressions,
  picturePath
 } = currentUser

 console.log(currentUser)



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


 useEffect(() => {
  // Transform the usernames into SuggestionDataItem objects
  if (users) {
   const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? [])?.map((user) => ({
    id: user._id,
    display: user.username,
    picturePath: user.picturePath,
    // name: user.name,
    // isVerified: user.isVerified
   }));
   setSuggestions(userSuggestions ?? []);

  }


 }, [users]);

 const handleOnChange = (
  event: { target: { value: string } },
 ) => {
  let value = event.target.value;
  value = value.replace(/\@\[(\w+)\]\(\w+\)/g, '@$1');
  setPostBody(value);
 };

 const handleOnAdd = (id: string | number, display: string) => {
  const mentionText = `@${display}`;
  const newText = postBody.replace(/@(\w+)?$/, mentionText);
  setPostBody(newText)
 }

 const handlePost = async () => {

  const formData = new FormData();
  formData.append('userId', _id);
  formData.append('description', postBody);



  const response = await fetch(`http://localhost:3001/posts`, {
   method: "POST",
   headers: { Authorization: `Bearer ${token}` },
   body: formData
  })
  const posts = await response.json();
  // dispatch(setPosts({ posts }));
  console.log(posts)
  setPost("");
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
       <Avatar src={data.picturePath || '/images/placeholder.png'} alt="profile-picture" />
       <div className='display-name'>
        <span>@{data.display}</span>
       </div>
      </div>
     )}
    />
   </MentionsInput>

   <Button actionLabel="Post" onClick={handlePost} isDisabled={postBody.length === 0} />
  </div>

 );
}

export default TextAndMentionInput;