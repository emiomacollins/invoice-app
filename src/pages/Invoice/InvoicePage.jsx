import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft } from '../../assets/CustomSvgs';
import InvoiceDetail from '../../components/Invoice/InvoiceDetail';
import { withInvoices } from '../../Helpers/withInvoices';
import { getInvoices } from '../../redux/invoicesSlice';
import { opacityAnimations } from '../Home/Home';

const Container = styled(motion.div)`
	display: grid;
	gap: 4rem;
`;

const BackBtn = styled(Link)`
	display: grid;
	grid-template-columns: auto auto;
	align-items: center;
	gap: 1rem;
	justify-self: left;
`;

function InvoicePage({ match }) {
	const { id } = match.params;
	const invoicesObj = useSelector(getInvoices);
	const invoice = invoicesObj[id];

	return (
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

				{invoice && <InvoiceDetail invoice={invoice} />}
			</Container>
		</div>
	);
}

export default withInvoices(withRouter(InvoicePage));
