import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Badge from '../reusables/Badge';
import { deleteInvoice, updateInvoice } from '../../redux/invoicesSlice';
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
	Status,
	Title,
} from './invoiceDetailStyles';

function InvoiceDetail({ invoice, history }) {
	const dispatch = useDispatch();
	console.log(invoice);

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
		history.push('/');
	}

	function handleMarkAsPaid() {
		dispatch(updateInvoice({ ...invoice, status: 'paid' }));
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
					<button className="btn btn--gray">Edit</button>
					<button onClick={handleDeleteInvoice} className="btn btn--red">
						Delete
					</button>
					{status === 'pending' && (
						<button onClick={handleMarkAsPaid} className="btn">
							Mark as paid
						</button>
					)}
				</Columns>
			</Controls>

			<Details>
				<DetailsHeader>
					<Title>
						<h3>
							<span className="accent">#</span>
							{id}
						</h3>
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

export default withRouter(InvoiceDetail);
