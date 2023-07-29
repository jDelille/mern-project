import PostFeed from "../../components/posts/post-feed/PostFeed";
import FeedHeader from "../../components/feed-header/FeedHeader";
import { FaHashtag } from 'react-icons/fa'
import './HomePage.scss';


const HomePage: React.FC = () => {
	// const { _id } = useSelector((state: AppState) => state.user);

	return <div className="home-page">
		{/* <Navbar /> */}
		<div className="content">
			<FeedHeader label="Explore" icon={FaHashtag} />
			<PostFeed />
		</div>
	</div>;
};

export default HomePage;
