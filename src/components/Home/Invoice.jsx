import React from 'react';
import styled from 'styled-components';
import { formatDate, formatNumber } from '../../Helpers/Util';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
	box-shadow: var(--shadow);
	padding: 1.5rem 2rem;
	background: var(--color-mid);
	border-radius: var(--border-radius);
`;

function Invoice({ invoice }) {
	console.log(invoice);
	const { id, clientName, paymentDue, total } = invoice;

	return (
		<Container>
			<h3>
				<span className="accent">#</span>
				{id}
			</h3>

			<p>{clientName}</p>

			<div className="rows">
				<p>Due {formatDate(paymentDue)}</p>
				<h3>£{formatNumber(total)}</h3>
			</div>
		</Container>
	);
}

export default Invoice;
