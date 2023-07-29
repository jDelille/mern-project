import './LinkFooter.scss';

const LinkFooter: React.FC = () => {
 return (
  <div className='link-footer'>
   <div className='espn-link'>
    <p>
     Sports data is provided by ESPN. To learn more about the api used,{' '}
     <a
      href='https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b'
      target='_blank'>
      click here.
     </a>
    </p>
   </div>
   <div className='github-link'>
    <p>
     To see what technologies are used in Wagerly and how it was built,{' '}
     <a href='https://github.com/jDelille/mern-project' target='_blank'>
      checkout our github repo
     </a>
    </p>
   </div>
  </div>
 );
};

export default LinkFooter;
