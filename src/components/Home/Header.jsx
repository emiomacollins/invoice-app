import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInvoicesTotal } from '../../redux/invoicesSlice';
import Filter from './Filter';
import { PlusIcon } from '../../assets/CustomSvgs';
import { setFormExpanded } from '../../redux/invoiceFormSlice';
import { withInvoices } from '../../Helpers/withInvoices';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	justify-items: left;

	@media (min-width: 800px) {
		grid-template-columns: 1fr auto auto;
		gap: 3rem;
	}
`;

const IconContainer = styled.div`
	background: #fff;
	border-radius: 100%;
	display: inline-block;
	width: 4rem;
	height: 4rem;
	display: grid;
	place-content: center;
`;

const Button = styled.button`
	display: flex;
	gap: 1rem;
	align-items: center;
	padding: 0.5em 1em 0.5em 0.5em;
	grid-column: 2 / span 1;

	@media (min-width: 800px) {
		grid-column: unset;
	}
`;

const Heading = styled.h1`
	line-height: 0.1;
`;

function Header() {
	const dispatch = useDispatch();
	const total = useSelector(getInvoicesTotal);

	function handleAddNewInvoice() {
		dispatch(setFormExpanded(true));
	}

	return (
		<Container>
			<div>
				<Heading>Invoices</Heading>
				{total ? <p>There are {total} total invoices</p> : null}
			</div>

			<Filter />

			<Button onClick={handleAddNewInvoice} className="btn">
				<IconContainer>
					<PlusIcon />
				</IconContainer>
				New invoice
			</Button>
		</Container>
	);
}

export default withInvoices(Header, { withSpinner: false, withError: false });
