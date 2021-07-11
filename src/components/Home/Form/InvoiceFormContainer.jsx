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
import { dateToString } from '../../../Helpers/Util';
import { cloneDeep } from 'lodash';
import { Body, FormContainer, Overlay } from './InvoiceFormStyles';
import InvoiceFormElement from './InvoiceFormElement';
import { useState } from 'react';

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const [isDraft, setIsDraft] = useState(false);
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

	if (isEditing) {
		initialValues.paymentDue = new Date(initialValues.paymentDue);
	}

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
							<InvoiceFormElement
								isDraft={isDraft}
								setIsDraft={setIsDraft}
								handleCloseForm={handleCloseForm}
							/>
						</Formik>
					</FormContainer>
					<Overlay onClick={handleCloseForm} />
				</Body>
			)}
		</AnimatePresence>
	);
}

export default InvoiceForm;