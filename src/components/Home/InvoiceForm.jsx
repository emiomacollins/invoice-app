import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
	getInvoiceFormExpanded,
	getInvoiceFormIsEditing,
	setIsEditing,
	toggleExpanded,
} from '../../redux/invoiceFormSlice';
import * as yup from 'yup';
import shortid from 'shortid';
import { addInvoice } from '../../redux/invoicesSlice';
import { DatePicker, Select, Textbox } from '../reusables/FormElements';

const Body = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: auto 1fr;
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
	width: 80vw;
	min-width: 320px;
	max-width: 800px;
	height: calc(100vh - var(--nav-height));
	display: grid;
	grid-template-rows: auto 1fr auto;
	gap: 3rem;
	background: var(--color-dark);
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;
	padding: 8rem 3rem 2rem 5rem;

	@media (min-width: 800px) {
		height: 100vh;
	}
`;

const Overlay = styled.div`
	cursor: pointer;
`;

const FormElement = styled(Form)`
	display: grid;
	gap: 3rem;
	overflow-y: scroll;
	overflow-x: hidden;

	padding-right: 3rem;
`;

const animation = {
	hidden: {
		x: '-100%',
	},
	visible: {
		x: 0,
	},
};

const FormSection = css`
	display: grid;
	gap: 3rem;
`;

const FormSectionHeading = styled.h4`
	color: var(--color-purple);
	/* margin-bottom: 1em; */
`;

const Columns = styled.div`
	display: grid;
	gap: 2rem;

	@media (min-width: 600px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1100px) {
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
	}
`;

const BillFrom = styled.div`
	${FormSection}
`;

const BillTo = styled.div`
	${FormSection}
`;

const FormControls = styled.div`
	display: grid;
	gap: 1.5rem;

	@media (min-width: 510px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 720px) {
		grid-template-columns: 1fr 1fr 1fr;
		justify-self: right;
	}
`;

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
		// paymentDue: '2021-08-19',
		paymentDue: new Date(),
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

		paymentDue: yup.date().required(),
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
		resetForm();
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
							<FormElement>
								<BillFrom>
									<FormSectionHeading>Bill From</FormSectionHeading>
									<Textbox
										label="street address"
										name="senderAddress.street"
									/>
									<Columns>
										<Textbox label="City" name="senderAddress.city" />
										<Textbox
											label="post code"
											name="senderAddress.postCode"
										/>
										<Textbox
											label="country"
											name="senderAddress.country"
										/>
									</Columns>
								</BillFrom>

								<BillTo>
									<FormSectionHeading>Bill to</FormSectionHeading>
									<Textbox label="client's name" name="clientName" />
									<Textbox
										label="client's email"
										name="clientEmail"
										placeholder="email@example.com"
									/>
									<Columns>
										<Textbox label="City" name="clientAddress.city" />
										<Textbox
											label="post code"
											name="clientAddress.postCode"
										/>
										<Textbox
											label="country"
											name="clientAddress.country"
										/>
									</Columns>
									<Columns>
										<DatePicker
											name="paymentDue"
											label="Payment Due"
										/>

										<Select label="Payment Terms" name="PaymentTerms">
											<option value="1">Next Day</option>
											<option value="7">Next 7 Days</option>
											<option value="14">Next 14 Days</option>
											<option value="30">Next 30 Days</option>
										</Select>
									</Columns>
								</BillTo>
							</FormElement>
						</Formik>
						<FormControls>
							<button className="btn btn--red">Discard</button>
							<button className="btn btn--gray">Save as Draft</button>
							<button className="btn">Save & Send</button>
						</FormControls>
					</FormContainer>
					<Overlay onClick={handleCloseForm} />
				</Body>
			)}
		</AnimatePresence>
	);
}

export default InvoiceForm;
