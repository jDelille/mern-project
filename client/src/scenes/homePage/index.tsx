import PostFeed from "../../components/posts/post-feed/PostFeed";
import { useSelector } from "react-redux";
import './HomePage.scss';

const HomePage: React.FC = () => {
	const { _id } = useSelector((state) => state.user);

	return <div className="home-page">
		{/* <Navbar /> */}
		<div className="content">
			<PostFeed userId={_id} />
		</div>
	</div>;
};

export default HomePage;
