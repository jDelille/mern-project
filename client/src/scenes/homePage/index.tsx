import PostFeed from "../../components/posts/post-feed/PostFeed";
import './HomePage.scss';


const HomePage: React.FC = () => {
	// const { _id } = useSelector((state: AppState) => state.user);
	return <div className="home-page">
		<div className="content">
			<PostFeed />
		</div>
	</div>;
};

export default HomePage;
