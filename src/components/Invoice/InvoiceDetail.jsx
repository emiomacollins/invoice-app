import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../reusables/Badge';
import { getInvoiceOperationStatus } from '../../redux/invoicesSlice';
import { formatDate, formatNumber } from '../../Helpers/Util';
import {
	Address,
	Bill,
	BillDetails,
	BillRow,
	BillTo,
	BillTotal,
	ClientAddress,
	Columns,
	Controls,
	Dates,
	Details,
	DetailsHeader,
	Email,
	InvoiceId,
	Status,
	Title,
} from './invoiceDetailStyles';
import { setIsEditing, setFormExpanded } from '../../redux/invoiceFormSlice';
import { deleteInvoice, updateInvoice } from '../../redux/invoicesThunks';

function InvoiceDetail({ invoice }) {
	const dispatch = useDispatch();
	const invoiceOperationStatus = useSelector(getInvoiceOperationStatus);

	const {
		status,
		id,
		description,
		clientAddress,
		paymentDue,
		createdAt,
		clientName,
		senderAddress,
		clientEmail,
		items,
		total,
	} = invoice;

	function handleDeleteInvoice() {
		dispatch(deleteInvoice(invoice.id));
	}

	function handleMarkAsPaid() {
		dispatch(updateInvoice({ ...invoice, status: 'paid' }));
	}

	function handleEditInvoice() {
		dispatch(setIsEditing(invoice));
		dispatch(setFormExpanded(true));
	}

	const itemsList = items.map(({ name, quantity, price, total }, idx) => {
		return (
			<BillRow key={idx}>
				<h4 className="name">{name}</h4>
				<h4 className="quantity">{quantity}</h4>
				<h4 className="price">£ {formatNumber(price)}</h4>
				<h4 className="total">£ {formatNumber(total)}</h4>
			</BillRow>
		);
	});

	return (
		<>
			<Controls>
				<Status>
					<p>Status</p>
					<Badge status={status} />
				</Status>
				<Columns>
					<button
						onClick={handleEditInvoice}
						disabled={invoiceOperationStatus === 'pending'}
						className="btn btn--gray"
					>
						Edit
					</button>

					<button
						onClick={handleDeleteInvoice}
						disabled={invoiceOperationStatus === 'pending'}
						className="btn btn--red"
					>
						Delete
					</button>

					{status === 'pending' && (
						<button
							onClick={handleMarkAsPaid}
							disabled={invoiceOperationStatus === 'pending'}
							className="btn"
						>
							Mark as paid
						</button>
					)}
				</Columns>
			</Controls>

			<Details>
				<DetailsHeader>
					<Title>
						<InvoiceId>
							<span className="accent">#</span>
							{id.slice(0, 6)}
						</InvoiceId>
						<p>{description}</p>
					</Title>
					<Address>
						<p>{senderAddress.street}</p>
						<p>{senderAddress.city}</p>
						<p>{senderAddress.postCode}</p>
						<p>{senderAddress.country}</p>
					</Address>
				</DetailsHeader>

				<Dates>
					<div>
						<p>Invoice date</p>
						<h3>{formatDate(createdAt)}</h3>
					</div>
					<div>
						<p>Payment due</p>
						<h3>{formatDate(paymentDue)}</h3>
					</div>
				</Dates>

				<BillTo>
					<p>Bill to</p>
					<h3>{clientName}</h3>
					<ClientAddress>
						<p>{clientAddress.street}</p>
						<p>{clientAddress.city}</p>
						<p>{clientAddress.postCode}</p>
						<p>{clientAddress.country}</p>
					</ClientAddress>
				</BillTo>

				<Email>
					<p>Sent to</p>
					<h3>{clientEmail}</h3>
				</Email>

				<Bill>
					<BillDetails>
						<BillRow>
							<p className="name">Item Name</p>
							<p className="quantity">QTY.</p>
							<p className="price">Price</p>
							<p className="total">Total</p>
						</BillRow>
						{itemsList}
					</BillDetails>
					<BillTotal>
						<h4>Amount Due</h4>
						<h2>£{formatNumber(total)}</h2>
					</BillTotal>
				</Bill>
			</Details>
		</>
	);
}

export default InvoiceDetail;
