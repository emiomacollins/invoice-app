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
		grid-template-columns: repeat(2, auto) 1fr auto auto;
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
	justify-self: right;

	@media (min-width: 800px) {
	}
`;

function Invoice({ invoice }) {
	const { id, clientName, paymentDue, total, status } = invoice;

	return (
		<Link to={`/invoice/${id}`}>
			<Container>
				<h3 className="capitalize">
					<span className="accent">#</span>
					{id}
				</h3>

				<Name>{clientName}</Name>

				<Row className="rows">
					<p>Due {formatDate(paymentDue)}</p>
					<h3>£{formatNumber(total)}</h3>
				</Row>

				<Badge status={status} />
			</Container>
		</Link>
	);
}

export default Invoice;
