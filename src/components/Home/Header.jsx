import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInvoicesTotal } from '../../redux/invoicesSlice';
import Filter from './Filter';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
`;

function Header() {
	const total = useSelector(getInvoicesTotal);

	return (
		<Container className="container">
			<div>
				<h1>Invoices</h1>
				<p>There are {total} total invoices</p>
			</div>
			<Filter />
		</Container>
	);
}

export default Header;
