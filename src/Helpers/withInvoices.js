import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Spinner from '../components/reusables/Spinner';
import { getInvoicesFetchingStatus } from '../redux/invoicesSlice';
import { fetchInvoices } from '../redux/invoicesThunks';

const ErrorMessage = styled.p`
	text-align: center;
`;

const Retry = styled.span`
	color: var(--color-accent);
	cursor: pointer;
`;

export function withInvoices(
	Component,
	options = { withSpinner: true, withError: true }
) {
	const Wrapper = (props) => {
		const status = useSelector(getInvoicesFetchingStatus);
		const dispatch = useDispatch();

		function handleFetchInvoices() {
			dispatch(fetchInvoices());
		}

		if (status === 'idle') {
			dispatch(fetchInvoices());
			return null;
		}

		if (status === 'pending') {
			return options?.withSpinner ? <Spinner /> : null;
		}

		if (status === 'rejected')
			return options?.withError ? (
				<ErrorMessage>
					Failed to fetch Invoices,{' '}
					<Retry onClick={handleFetchInvoices}>Retry.</Retry>
				</ErrorMessage>
			) : null;

		return <Component {...props} />;
	};
	return Wrapper;
}

// this Higher order function handles fetching invoices if it does not exist.
// it fetches invoices and renders a spinner then when the invoices
// arrive it renders the component it was called on
