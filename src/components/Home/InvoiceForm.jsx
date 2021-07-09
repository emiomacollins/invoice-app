import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	getInvoiceFormExpanded,
	getInvoiceFormIsEditing,
	setIsEditing,
	toggleExpanded,
} from '../../redux/invoiceFormSlice';
import * as yup from 'yup';
import shortid from 'shortid';
import { addInvoice } from '../../redux/invoicesSlice';

const Body = styled.div`
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
	padding: 5rem;
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

	function handleCloseForm() {
		dispatch(toggleExpanded());
		dispatch(setIsEditing(null));
	}

	const initialValues = {
		clientAddress: {
			city: '',
			country: '',
			postCode: '',
			street: '',
		},
		clientEmail: '',
		clientName: '',
		description: '',
		items: [
			{
				name: '',
				price: 0,
				quantity: 1,
			},
		],
		paymentDue: '2021-08-19',
		paymentTerms: 1,
		senderAddress: {
			city: '',
			country: '',
			postCode: '',
			street: '',
		},
	};

	const validationSchema = yup.object({
		clientAddress: yup.object({
			city: yup.string().required(),
			country: yup.string().required(),
			postCode: yup.string().required(),
			street: yup.string().required(),
		}),

		clientEmail: yup.string().email().required(),
		clientName: yup.string().max(20).required(),
		description: yup.string().required(),

		items: yup.array().of(
			yup.object({
				name: yup.string().required(),
				price: yup.number().required(),
				quantity: yup.number().required(),
			})
		),

		paymentDue: yup.string().required(),
		paymentTerms: yup.number().required(),

		senderAddress: yup.object({
			city: yup.string().required(),
			country: yup.string().required(),
			postCode: yup.string().required(),
			street: yup.string().required(),
		}),
	});

	function onSubmit(values, { resetForm }) {
		const {
			clientAddress,
			clientEmail,
			clientName,
			description,
			items,
			paymentDue,
			paymentTerms,
			senderAddress,
		} = values;

		const invoice = {
			clientAddress,
			clientEmail,
			clientName,
			createdAt: new Date(),
			description,
			id: shortid.generate(),
			items,
			paymentDue: new Date(paymentDue),
			paymentTerms,
			senderAddress,
			status: 'pending',
			total: items.reduce((acc, item) => {
				return acc + item.price * item.quantity;
			}, 0),
		};

		dispatch(addInvoice(invoice));
	}

	return (
		<AnimatePresence>
			{expanded && (
				<Body>
					<FormContainer
						variants={animation}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.3 }}
					>
						<h2>{isEditing ? 'Edit' : 'Create'} Invoice</h2>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							<FormElement></FormElement>
						</Formik>
					</FormContainer>
					<Overlay onClick={handleCloseForm} />
				</Body>
			)}
		</AnimatePresence>
	);
}

export default InvoiceForm;
