import React from 'react';
import { HomeContainer } from './HomeStyles';
import Header from '../../components/Home/Header';
import InvoiceList from '../../components/Home/InvoiceList';

function Home() {
	return (
		<HomeContainer>
			<Header />
			<InvoiceList />
		</HomeContainer>
	);
}

export default Home;
