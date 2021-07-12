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
import { addInvoice, updateInvoice } from '../../../redux/invoicesSlice';
import { cloneDeep } from 'lodash';
import { Body, FormContainer, Overlay } from './InvoiceFormStyles';
import InvoiceFormElement from './InvoiceFormElement';
import { useEffect } from 'react';

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const dispatch = useDispatch();
	const BodyEl = document.querySelector(`html`);

	function handleCloseForm() {
		dispatch(toggleExpanded());
		dispatch(setIsEditing(null));
	}

	useEffect(() => {
		if (expanded) {
			BodyEl.style.overflowY = 'hidden';
		} else BodyEl.style.overflowY = 'scroll';
	}, [BodyEl.style, expanded]);

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
		createdAt: new Date(),
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
		// convert string date to object for the form to use
		initialValues.createdAt = new Date(initialValues.createdAt);
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

		createdAt: yup.date().required(),
		paymentTerms: yup.number().required(),

		senderAddress: yup.object({
			city: yup.string().required(),
			country: yup.string().required(),
			postCode: yup.string().required(),
			street: yup.string().required(),
		}),
	});

	function onSubmit(values, formikApi, options) {
		const {
			clientAddress,
			clientEmail,
			clientName,
			description,
			items,
			createdAt,
			paymentTerms,
			senderAddress,
		} = values;

		const invoice = {
			clientAddress,
			clientEmail,
			clientName,
			createdAt: createdAt.toISOString(),
			paymentDue: new Date(
				// convert payment terms to milliseconds
				createdAt.getTime() + paymentTerms * 24 * 60 * 60 * 1000
			).toISOString(),
			description,
			items: items.map((item) => ({
				...item,
				total: item.price * item.quantity || 0,
			})),
			paymentTerms,
			senderAddress,
			status:
				// if it's being edited and it's either pending or paid set it to either
				// if it's being saved as draft set it to draft
				// else set it to pending
				isEditing && isEditing.status !== 'draft'
					? isEditing.status
					: options?.isDraft
					? 'draft'
					: 'pending',
			total: items.reduce((acc, item) => {
				return acc + item.price * item.quantity || 0;
			}, 0),
		};

		isEditing
			? dispatch(updateInvoice({ ...invoice, id: isEditing.id }))
			: dispatch(addInvoice(invoice));
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
								handleCloseForm={handleCloseForm}
								onSubmit={onSubmit}
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
