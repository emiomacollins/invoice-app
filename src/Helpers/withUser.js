import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../redux/userSlice';

export function withUser(Component) {
	const Wrapper = (props) => {
		const user = useSelector(getUser);
		if (!user) return <Redirect to="/" />;
		return <Component {...props} />;
	};
	return Wrapper;
}
