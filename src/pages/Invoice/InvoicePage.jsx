import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft } from '../../assets/CustomSvgs';
import InvoiceDetail from '../../components/Invoice/InvoiceDetail';
import { withInvoices } from '../../Helpers/withInvoices';
import { withUser } from '../../Helpers/withUser';
import { getInvoices } from '../../redux/invoicesSlice';
import { opacityAnimations } from '../Home/Home';

const Container = styled(motion.div)`
	display: grid;
	gap: 4rem;
`;

const BackBtn = styled(Link)`
	display: grid !important;
	grid-template-columns: auto auto;
	align-items: center;
	gap: 1rem;
	justify-self: left;
`;

function InvoicePage() {
	const match = useRouteMatch();
	const { id: invoiceID } = match.params;
	const invoicesObj = useSelector(getInvoices);
	const invoice = invoicesObj[invoiceID];

	return invoice ? (
		<div className="page">
			<Container
				variants={opacityAnimations}
				initial="hide"
				animate="show"
				className="container"
			>
				<BackBtn to="/" className="btn">
					<ArrowLeft stroke="#fff" />
					Go back
				</BackBtn>

				<InvoiceDetail invoice={invoice} />
			</Container>
		</div>
	) : (
		<Redirect to="/" />
	);
}

export default withInvoices(withUser(InvoicePage));
