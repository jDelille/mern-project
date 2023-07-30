import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mention, MentionItem, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions'
import { setPosts } from "../../state";
import Avatar from "../../ui/avatar/Avatar";
import mentionsInputStyle from './mentionsInputStyle.js';

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 username?: string;
 picturePath?: string;
 // isVerified?: boolean;
}

const TextAndMentionInput: React.FC = () => {

 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])

 const dispatch = useDispatch();
 const { _id } = useSelector((state) => state.user);
 const token = useSelector((state) => state.token);
 const [post, setPost] = useState("");
 const [postBody, setPostBody] = useState("");

 useEffect(() => {
  // Transform the usernames into SuggestionDataItem objects
  const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? []).map((user) => ({
   id: user.id,
   display: user.username,
   avatar: user.photo as string,
   name: user.name,
   isVerified: user.isVerified
  }));

  setSuggestions(userSuggestions ?? []);
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

  const postBody = {
   description: 'Testing'
  }

  const response = await fetch(`http://localhost:3001/posts`, {
   method: "POST",
   headers: { Authorization: `Bearer ${token}` },
   body: JSON.stringify(postBody)
  })
  const posts = await response.json();
  dispatch(setPosts({ posts }));
  setPost("");
 }




 return (
  <MentionsInput
   value={postBody}
   placeholder='Placeholder'
   onChange={(event) => {
    handleOnChange(event);
   }}
   style={mentionsInputStyle}
   inputRef={textareaRef}
   rows={1}
   className='mentions-input'
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
       <span>@{data.username}</span>
      </div>

     </div>
    )}
   />

  </MentionsInput>
 );
}

export default TextAndMentionInput;