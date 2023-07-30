import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
// import { setPosts, setUsers } from "../../state";
import Avatar from "../../ui/avatar/Avatar";
import { User } from "types/@User.js";
import mentionsInputStyle from "./mentionsInputStyle";
import Button from "../../ui/button/Button";
import './TextAndMentionInput.scss';
import { AppState } from "types/@AppState";

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 username?: string;
 avatar?: string;
 // isVerified?: boolean;
}

const TextAndMentionInput: React.FC = () => {

 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])

 // const dispatch = useDispatch();
 const currentUser = useSelector((state: AppState) => state.user);
 const token = useSelector((state: AppState) => state.token);
 // const [post, setPost] = useState("");
 const [users, setUsers] = useState<User[]>()
 const [postBody, setPostBody] = useState("");




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

   const response = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
   })

   const posts = await response.json();
   // dispatch(setPosts({ posts }));
   console.log(posts)
   // setPost("");
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

   <Button actionLabel="Post" onClick={handlePost} isDisabled={postBody.length === 0} />
  </div>

 );
}

export default TextAndMentionInput;