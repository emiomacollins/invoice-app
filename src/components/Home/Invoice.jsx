import React from 'react';
import styled from 'styled-components';
import { formatDate, formatNumber } from '../../Helpers/Util';
import Badge from '../reusables/Badge';
import { Link } from 'react-router-dom';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
	box-shadow: var(--shadow);
	padding: 2rem;
	background: var(--color-mid);
	border-radius: var(--border-radius);
	border: 1px solid transparent;
	color: var(--color-white);
	align-items: center;

	transition: 0.2s;

	&:hover {
		border-color: var(--color-purple);
	}

	@media (min-width: 1000px) {
		grid-template-columns: 11rem 15rem 1fr auto auto;
		align-items: center;
	}
`;

const Row = styled.div`
	display: grid;
	gap: 1rem;

	@media (min-width: 800px) {
		grid-template-columns: auto 1fr;
		justify-items: right;
	}
`;

const Name = styled.p`
	@media (min-width: 800px) {
	}
`;

const InvoiceId = styled.h3`
	text-transform: uppercase;
	font-size: var(--size-400);
`;

const Price = styled.h3`
	font-size: var(--size-500);
`;

function Invoice({ invoice }) {
	const { id, clientName, paymentDue, total, status } = invoice;

	return (
		<Link to={`/invoice/${id}`}>
			<Container>
				<InvoiceId>
					<span className="accent">#</span>
					{id.slice(0, 6)}
				</InvoiceId>

				<Name>{clientName}</Name>

				<Row className="rows">
					<p>Due {formatDate(paymentDue)}</p>
					<Price>£{formatNumber(total)}</Price>
				</Row>

				<Badge status={status} />
			</Container>
		</Link>
	);
}

export default Invoice;
