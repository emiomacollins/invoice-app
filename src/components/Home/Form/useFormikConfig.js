import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getInvoiceFormIsEditing } from '../../../redux/invoiceFormSlice';
import { addInvoice, updateInvoice } from '../../../redux/invoicesThunks';

export function useFormikConfig() {
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const dispatch = useDispatch();

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

	function onSubmit(values, Formik, options) {
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

		// validate draft too
		let draftIsValid = true;
		if (options?.isDraft) {
			Object.entries(values).forEach(([field, value]) => {
				const meta = Formik.getFieldMeta(field);

				if (meta.touched && meta.error) {
					// console.log(field,'is Invalid');

					if (typeof value === 'object' && !value.length) {
						Object.keys(value).forEach((key) => {
							Formik.setFieldTouched(`${field}.${key}`, true);
							Formik.setFieldError(`${field}.${key}`, true);
						});
					}

					draftIsValid = false;
					return;
				}
			});
		}
		if (!draftIsValid) return;

		isEditing
			? dispatch(updateInvoice({ ...invoice, id: isEditing.id }))
			: dispatch(addInvoice(invoice));
	}

	return {
		onSubmit,
		validationSchema,
		initialValues,
	};
}
