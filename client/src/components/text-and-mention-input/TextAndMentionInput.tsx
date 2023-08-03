import { useEffect, useRef, useState } from "react";
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { User } from "types/@User.js";
import mentionsInputStyle from "./mentionsInputStyle";
import { FaWindowClose } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import './TextAndMentionInput.scss';


interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 username?: string;
 avatar?: string;
}

type Props = {
 postBody: string;
 setPostBody: (str: string) => void;
 image: string;
 setImage: (base64: string) => void;
 placeholder: string;
 isComment?: boolean;
}

const TextAndMentionInput: React.FC<Props> = ({ postBody, setPostBody, image, setImage, placeholder, isComment }) => {

 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])

 const [users, setUsers] = useState<User[]>()

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
  if (users) {
   const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? [])?.map((user) => ({
    id: user._id,
    display: user.username,
    avatar: user.avatar,
    name: user.name,
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

  if (value.length <= 500) {
   setPostBody(value)
  } else {
   setPostBody(value.slice(0, 500))
  }
 };

 const handleOnAdd = (id: string | number, display: string) => {
  const mentionText = `@${display}`;
  const newText = postBody.replace(/@(\w+)?$/, mentionText);
  setPostBody(newText)
 }

 return (
  <div className="text-and-mentions-input">
   <MentionsInput
    value={postBody}
    placeholder={placeholder}
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
       <img src={data.avatar || '/images/placeholder.png'} alt="profile-picture" />
       <div className='display-name'>
        <span>@{data.display}</span>
       </div>
      </div>
     )}
    />
   </MentionsInput>
   {image && !isComment && (
    <div className='image-preview'>
     <FaWindowClose
      color="white"
      size={20}
      onClick={() => setImage("")}
     />
     <img src={image} alt="image" />
    </div>
   )}

   {image && isComment && (
    <div className='comment-image-preview'>
     <AiFillCloseCircle color="gray" size={20} onClick={() => setImage("")} />
     <img src={image} alt="image" />
    </div>
   )}

  </div>

 );
}

export default TextAndMentionInput;