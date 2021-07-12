import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/reusables/Spinner';
import { fetchInvoices, getIsFetchingInvoices } from '../redux/invoicesSlice';

export function withInvoices(Component) {
	const Wrapper = (props) => {
		const isFetchingInvoices = useSelector(getIsFetchingInvoices);
		const dispatch = useDispatch();

		if (isFetchingInvoices === 'idle') {
			dispatch(fetchInvoices());
			return null;
		}

		if (isFetchingInvoices === true) {
			return <Spinner />;
		}

		return <Component {...props} />;
	};
	return Wrapper;
}
