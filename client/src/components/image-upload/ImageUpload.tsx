import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdPhotoLibrary } from 'react-icons/md'

type Props = {
 onChange: (base64: string) => void;
 value: string;
 isPost?: boolean;
 isComment?: boolean;
}


const ImageUpload: React.FC<Props> = ({ onChange, value, isPost, isComment }) => {
 const [base64, setBase64] = useState(value);

 const handleChange = useCallback((base64: string) => {
  onChange(base64);
 }, [onChange])

 const handleDrop = (
  acceptedFiles: File[],
 ) => {
  // Your existing logic
  const file = acceptedFiles[0];
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
   if (event.target && event.target.result) {
    setBase64(event.target.result as string);
    handleChange(event.target.result as string);
   }
  };

  reader.readAsDataURL(file);
 };

 const { getRootProps, getInputProps } = useDropzone({
  maxFiles: 1,
  onDrop: handleDrop,
  accept: {
   'image/jpeg': [],
   'image/png': [],
  },
 });



 return (
  <>
   <div {...getRootProps({})}>
    {!isPost && !isComment ? (
     <>
      <input
       {...getInputProps()}
       placeholder='upload image'
       width={'100px'}
       height={'50px'}
      />
      <img src={base64} alt="profile-picture" width={'50px'} height={'50px'} style={{ objectFit: 'contain' }} />
     </>
    ) : (
     <div className='icon'>
      <MdPhotoLibrary size={24} color="#606984" />
     </div>
    )}
   </div>
  </>
 );
}

export default ImageUpload;