import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/reusables/Spinner';
import {
	fetchInvoices,
	getFilteredInvoices,
	getIsFetchingInvoices,
} from '../redux/invoicesSlice';
import { getUser } from '../redux/userSlice';

export function withInvoices(Component) {
	const Wrapper = (props) => {
		const user = useSelector(getUser);
		const invoices = useSelector(getFilteredInvoices);
		const isFetchingInvoices = useSelector(getIsFetchingInvoices);
		const dispatch = useDispatch();

		if (isFetchingInvoices === 'idle') {
			dispatch(fetchInvoices(user.uid));
			return null;
		}

		if (isFetchingInvoices === true) {
			return <Spinner />;
		}

		if (isFetchingInvoices === false && !invoices.length) {
			// todo
			// show error message
		}

		return <Component {...props} />;
	};
	return Wrapper;
}
