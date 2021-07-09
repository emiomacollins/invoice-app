import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ArrowLeft } from '../../assets/CustomSvgs';
import Badge from '../../components/reusables/StyledComponents/Badge';
import { deleteInvoice, getInvoices } from '../../redux/invoicesSlice';

const Card = css`
	box-shadow: var(--shadow);
	padding: 3rem;
	background: var(--color-mid);
	border-radius: var(--border-radius);
`;

const Status = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;

	@media (min-width: 900px) {
		justify-content: left;
	}
`;

const Controls = styled.div`
	${Card}
	display: grid;
	gap: 2rem;

	@media (min-width: 900px) {
		grid-template-columns: 1fr repeat(3, auto);
	}
`;

const Columns = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 1rem;
	justify-content: right;

	@media (max-width: 400px) {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;

		.btn:nth-child(3) {
			order: -1;
		}
	}
`;

function InvoiceDetail({ invoice, history }) {
	const dispatch = useDispatch();
	console.log(invoice);

	const { status } = invoice;

	function handleDeleteInvoice() {
		dispatch(deleteInvoice(invoice.id));
		history.push('/');
	}

	return (
		<>
			<Controls>
				<Status>
					<p>Status</p>
					<Badge status={status} />
				</Status>

				<Columns>
					<button className="btn btn--gray">Edit</button>
					<button onClick={handleDeleteInvoice} className="btn btn--red">
						Delete
					</button>
					<button className="btn">Mark as paid</button>
				</Columns>
			</Controls>
		</>
	);
}

export default withRouter(InvoiceDetail);
