import { useDispatch, useSelector } from 'react-redux';
import { setFollowing } from '../state';
import { AppState } from 'types/@AppState';

const useFollow = () => {
	const dispatch = useDispatch();
	const token = useSelector((state: AppState) => state.token);

	const followUser = async (currentUserId: string, userId: string) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users/${currentUserId}/${userId}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				dispatch(setFollowing({ friends: data }));
				return true; // Indicate successful follow
			} else {
				// Handle error
				return false; // Indicate failed follow
			}
		} catch (error) {
			// Handle error
			return false; // Indicate failed follow
		}
	};

	return { followUser };
};

export default useFollow;
