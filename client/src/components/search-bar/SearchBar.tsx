import { FaSearch } from 'react-icons/fa'
import './SearchBar.scss';

const SearchBar: React.FC = () => {
 return (
  <div className="search-bar">
   <p>Search</p>
   <div className='search-icon'>
    <FaSearch size={16} color="#606984" />
   </div>

  </div>
 );
}

export default SearchBar;