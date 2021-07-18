import { useFormikContext } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { getInvoiceFormIsEditing } from '../../../redux/invoiceFormSlice';
import { getInvoiceOperationStatus } from '../../../redux/invoicesSlice';
import { DatePicker, Select, Textbox } from '../../reusables/FormElements';
import {
	BillFrom,
	BillTo,
	Columns,
	FormControls,
	FormElement,
	FormSectionHeading,
} from './InvoiceFormStyles';
import ItemList from './ItemList';

function InvoiceFormElement({ handleCloseForm, onSubmit }) {
	const Formik = useFormikContext();
	const { values } = Formik;
	const isEditing = useSelector(getInvoiceFormIsEditing);
	const invoiceOperationStatus = useSelector(getInvoiceOperationStatus);

	function handleSaveAsDraft() {
		onSubmit(values, Formik, { isDraft: true });
	}

	return (
		<>
			<FormElement id="formik">
				<BillFrom>
					<FormSectionHeading>Bill From</FormSectionHeading>
					<Textbox label="street address" name="senderAddress.street" />
					<Columns>
						<Textbox label="City" name="senderAddress.city" />
						<Textbox label="post code" name="senderAddress.postCode" />
						<Textbox label="country" name="senderAddress.country" />
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
					<Textbox label="street address" name="clientAddress.street" />

					<Columns>
						<Textbox label="City" name="clientAddress.city" />
						<Textbox label="post code" name="clientAddress.postCode" />
						<Textbox label="country" name="clientAddress.country" />
					</Columns>

					<Columns>
						<DatePicker name="createdAt" label="Invoice Date" />
						<Select label="Payment Terms" name="paymentTerms">
							<option value="1">Next Day</option>
							<option value="7">Next 7 Days</option>
							<option value="14">Next 14 Days</option>
							<option value="30">Next 30 Days</option>
						</Select>
					</Columns>

					<Textbox
						label="Description"
						name="description"
						placeholder="e.g Graphic Design Services"
					/>
				</BillTo>

				<ItemList />
			</FormElement>

			<FormControls>
				<button onClick={handleCloseForm} className="btn btn--red">
					Discard
				</button>

				{!['pending', 'paid'].includes(values.status) && (
					<button
						onClick={handleSaveAsDraft}
						disabled={invoiceOperationStatus === 'pending'}
						className="btn btn--gray"
					>
						Save as Draft
					</button>
				)}

				<button
					form="formik"
					className="btn"
					type="submit"
					disabled={invoiceOperationStatus === 'pending'}
				>
					{isEditing ? 'Save Changes' : 'Save and Send'}
				</button>
			</FormControls>
		</>
	);
}

export default InvoiceFormElement;
