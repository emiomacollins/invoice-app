import { useFormikContext } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { getInvoiceFormIsEditing } from '../../../redux/invoiceFormSlice';
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

function InvoiceFormElement({ isDraft, setIsDraft, handleCloseForm }) {
	const { values, handleSubmit: onSubmit } = useFormikContext();
	const isEditing = useSelector(getInvoiceFormIsEditing);

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
						<DatePicker name="paymentDue" label="Payment Due" />

						<Select label="Payment Terms" name="PaymentTerms">
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

				{values.status === 'draft' && (
					<button
						onClick={() => {
							setIsDraft(true);
							onSubmit(values);
						}}
						className="btn btn--gray"
					>
						Save as Draft
					</button>
				)}
				<button form="formik" className="btn" type="submit">
					{isEditing ? 'Save Changes' : 'Save as Draft'}
				</button>
			</FormControls>
		</>
	);
}

export default InvoiceFormElement;
