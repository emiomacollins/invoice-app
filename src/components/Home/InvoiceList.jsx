import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getFilteredInvoices } from '../../redux/invoicesSlice';
import Invoice from './Invoice';

const Container = styled.div`
	display: grid;
	gap: 2rem;
`;

function InvoiceList() {
	const invoices = useSelector(getFilteredInvoices);

	return (
		<Container className="container">
			{invoices.map((invoice) => (
				<Invoice key={invoice.id} invoice={invoice} />
			))}
		</Container>
	);
}

export default InvoiceList;
