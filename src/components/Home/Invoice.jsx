import React from 'react';
import styled from 'styled-components';
import { formatDate, formatNumber } from '../../Helpers/Util';
import Badge from '../reusables/StyledComponents/Badge';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
	box-shadow: var(--shadow);
	padding: 1.5rem 2rem;
	background: var(--color-mid);
	border-radius: var(--border-radius);
`;

const Name = styled.p`
	justify-self: right;
`;

function Invoice({ invoice }) {
	console.log(invoice);
	const { id, clientName, paymentDue, total, status } = invoice;

	return (
		<Container>
			<h3>
				<span className="accent">#</span>
				{id}
			</h3>

			<Name>{clientName}</Name>

			<div className="rows">
				<p>Due {formatDate(paymentDue)}</p>
				<h3>£{formatNumber(total)}</h3>
			</div>

			<Badge status={status} />
		</Container>
	);
}

export default Invoice;
