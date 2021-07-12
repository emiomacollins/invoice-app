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

// this higher order function blocks a non authenticated
// person (non user) from accessing a component by redirecting
// the person to the homepage, which renders the login component
