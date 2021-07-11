import { Formik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getInvoiceFormExpanded,
	getInvoiceFormIsEditing,
	setIsEditing,
	toggleExpanded,
} from '../../../redux/invoiceFormSlice';
import * as yup from 'yup';
import shortid from 'shortid';
import { addInvoice, updateInvoice } from '../../../redux/invoicesSlice';
import { DatePicker, Select, Textbox } from '../../reusables/FormElements';
import { dateToString } from '../../../Helpers/Util';
import { cloneDeep } from 'lodash';
import {
	BillFrom,
	Body,
	Columns,
	FormContainer,
	FormControls,
	FormElement,
	FormSectionHeading,
	Overlay,
	BillTo,
} from './InvoiceFormStyles';
import ItemList from './ItemList';

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);
	const isEditing = useSelector(getInvoiceFormIsEditing);
	let isDraft = false;
	const dispatch = useDispatch();

	function handleCloseForm() {
		dispatch(toggleExpanded());
		dispatch(setIsEditing(null));
	}

	const initialValues = (isEditing && cloneDeep(isEditing)) || {
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
				price: '',
				quantity: '',
			},
		],
		paymentDue: new Date(),
		paymentTerms: 1,
		senderAddress: {
			city: '',
			country: '',
			postCode: '',
			street: '',
		},
		status: 'draft',
	};

	initialValues.paymentDue = new Date(initialValues.paymentDue);

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

	function onSubmit(values) {
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
			createdAt: isEditing?.createdAt || dateToString(new Date()),
			description,
			id: isEditing?.id || shortid.generate(),
			items,
			paymentDue: dateToString(paymentDue),
			paymentTerms,
			senderAddress,
			status:
				// if it's either pending or paid set it to either
				// if it's being saved as draft set it to draft
				// else set it to pending
				isEditing && isEditing.status !== 'draft'
					? isEditing.status
					: isDraft
					? 'draft'
					: 'pending',
			total: items.reduce((acc, item) => {
				return acc + item.price * item.quantity;
			}, 0),
		};

		isEditing ? dispatch(updateInvoice(invoice)) : dispatch(addInvoice(invoice));
		handleCloseForm();
	}

	const animation = {
		hidden: {
			x: '-100%',
		},
		visible: {
			x: 0,
		},
	};

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
							// validate={() => {}}
							onSubmit={onSubmit}
						>
							{({ values, setFieldValue }) => (
								<>
									<FormElement id="formik">
										<BillFrom>
											<FormSectionHeading>
												Bill From
											</FormSectionHeading>
											<Textbox
												label="street address"
												name="senderAddress.street"
											/>
											<Columns>
												<Textbox
													label="City"
													name="senderAddress.city"
												/>
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
											<FormSectionHeading>
												Bill to
											</FormSectionHeading>
											<Textbox
												label="client's name"
												name="clientName"
											/>
											<Textbox
												label="client's email"
												name="clientEmail"
												placeholder="email@example.com"
											/>
											<Textbox
												label="street address"
												name="clientAddress.street"
											/>
											<Columns>
												<Textbox
													label="City"
													name="clientAddress.city"
												/>
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

												<Select
													label="Payment Terms"
													name="PaymentTerms"
												>
													<option value="1">Next Day</option>
													<option value="7">Next 7 Days</option>
													<option value="14">
														Next 14 Days
													</option>
													<option value="30">
														Next 30 Days
													</option>
												</Select>
											</Columns>
											<Textbox
												label="Description"
												name="description"
												placeholder="e.g Graphic Design Services"
											/>
										</BillTo>

										<h3>Item List</h3>
										<ItemList />
									</FormElement>

									<FormControls>
										<button
											onClick={handleCloseForm}
											className="btn btn--red"
										>
											Discard
										</button>

										{initialValues.status === 'draft' && (
											<button
												onClick={() => {
													isDraft = true;
													onSubmit(values);
												}}
												className="btn btn--gray"
											>
												Save as Draft
											</button>
										)}
										<button
											form="formik"
											className="btn"
											type="submit"
										>
											{isEditing ? 'Save Changes' : 'Save as Draft'}
										</button>
									</FormControls>
								</>
							)}
						</Formik>
					</FormContainer>
					<Overlay onClick={handleCloseForm} />
				</Body>
			)}
		</AnimatePresence>
	);
}

export default InvoiceForm;
