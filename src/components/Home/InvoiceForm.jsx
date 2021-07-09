import { Form } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	getInvoiceFormExpanded,
	getInvoiceFormIsEditing,
	toggleExpanded,
} from '../../redux/invoiceFormSlice';

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: 2fr 1fr;
	background: var(--color-overlay);
	width: 100vw;
	height: 100vh;
	z-index: 2;
	padding-top: var(--nav-height);

	@media (min-width: 800px) {
		padding-top: 0;
		padding-left: calc(var(--nav-width) - 2rem);
	}
`;

const FormContainer = styled(motion.div)`
	background: var(--color-dark);
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;
	display: grid;
	grid-template-rows: auto 1fr auto;
`;

const Overlay = styled.div`
	cursor: pointer;
`;

const FormElement = styled(Form)``;

const animation = {
	hidden: {
		x: '-100%',
	},
	visible: {
		x: 0,
	},
};

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const dispatch = useDispatch();

	function handleToggleExpanded() {
		dispatch(toggleExpanded());
	}

	return (
		<AnimatePresence>
			{expanded && (
				<Container>
					<FormContainer
						variants={animation}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.3 }}
					>
						<h2>{isEditing ? 'Edit' : 'Create'} Invoice</h2>
						<FormElement></FormElement>
					</FormContainer>
					<Overlay onClick={handleToggleExpanded} />
				</Container>
			)}
		</AnimatePresence>
	);
}

export default InvoiceForm;
