import PostFeed from "../../components/posts/post-feed/PostFeed";
import { useSelector } from "react-redux";
import './HomePage.scss';
import { AppState } from "../../types/@AppState";

const HomePage: React.FC = () => {
	// const { _id } = useSelector((state: AppState) => state.user);

	return <div className="home-page">
		{/* <Navbar /> */}
		<div className="content">
			<PostFeed  />
		</div>
	</div>;
};

export default HomePage;
