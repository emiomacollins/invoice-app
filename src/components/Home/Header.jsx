import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInvoicesTotal } from '../../redux/invoicesSlice';
import Filter from './Filter';
import { PlusIcon } from '../../assets/CustomSvgs';

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

function Header() {
	const total = useSelector(getInvoicesTotal);

	return (
		<Container>
			<div>
				<h1>Invoices</h1>
				<p>There are {total} total invoices</p>
			</div>
			<Filter />
			<Button className="btn">
				<IconContainer>
					<PlusIcon />
				</IconContainer>
				New invoice
			</Button>
		</Container>
	);
}

export default Header;
