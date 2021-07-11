import React from 'react';
import Header from '../../components/Home/Header';
import InvoiceList from '../../components/Home/InvoiceList';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import Login from '../../components/Home/Login';

export const Container = styled.div`
	display: grid;
	gap: 5rem;
`;

export const opacityAnimations = {
	hide: {
		opacity: 0,
		transition: { duration: 0.5 },
	},
	show: {
		opacity: 1,
		transition: { duration: 0.5 },
	},
};

function Home() {
	const user = useSelector(getUser);

	return (
		<motion.div
			variants={opacityAnimations}
			initial="hide"
			animate="show"
			exit="hide"
			className="page"
		>
			<Container className="container">
				{user ? (
					<>
						<Header />
						<InvoiceList />
					</>
				) : (
					<Login />
				)}
			</Container>
		</motion.div>
	);
}

export default Home;
