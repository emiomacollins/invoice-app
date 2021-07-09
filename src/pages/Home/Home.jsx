import React from 'react';
import Header from '../../components/Home/Header';
import InvoiceList from '../../components/Home/InvoiceList';
import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	gap: 5rem;
`;

function Home() {
	return (
		<div className="page">
			<Container className="container">
				<Header />
				<InvoiceList />
			</Container>
		</div>
	);
}

export default Home;
