/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getInvoiceFormExpanded,
	getInvoiceFormIsEditing,
	setIsEditing,
	setFormExpanded,
} from '../../../redux/invoiceFormSlice';
import {
	getInvoiceOperationStatus,
	setInvoiceOperationStatus,
} from '../../../redux/invoicesSlice';
import { Body, FormContainer, Overlay } from './InvoiceFormStyles';
import InvoiceFormElement from './InvoiceFormElement';
import { useEffect } from 'react';
import { useFormikConfig } from './useFormikConfig';

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const invoiceOperationStatus = useSelector(getInvoiceOperationStatus);
	const { onSubmit, validationSchema, initialValues } = useFormikConfig();
	const dispatch = useDispatch();
	const BodyEl = document.querySelector(`html`);

	function handleCloseForm() {
		dispatch(setFormExpanded(false));
		dispatch(setIsEditing(null));
	}

	useEffect(() => {
		if (expanded) {
			BodyEl.style.overflowY = 'hidden';
		} else BodyEl.style.overflowY = 'scroll';
	}, [expanded]);

	// when you add / update an invoice successfully, this triggers
	useEffect(() => {
		if (invoiceOperationStatus === 'fufilled') {
			handleCloseForm();
			dispatch(setInvoiceOperationStatus('idle'));
		}
	}, [invoiceOperationStatus]);

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
