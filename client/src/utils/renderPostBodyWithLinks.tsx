const renderPostBodyWithLinks = (
 postBody: string,
 mentionedUsernames: string[]
) => {
 const parts = postBody?.split(/(@\w+)/g);

 return parts?.map((part, index) => {
  if (mentionedUsernames.includes(part.slice(1))) {
   return (
    <a
     href={`/profile/${part.slice(1)}`}
     key={index}
     className='tagged-username'>
     {part}
    </a>
   );
  } else {
   return <span key={index}>{part}</span>;
  }
 });
};

export default renderPostBodyWithLinks;
