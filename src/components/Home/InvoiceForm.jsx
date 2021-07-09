import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getInvoiceFormExpanded } from '../../redux/invoiceFormSlice';

const Container = styled.div``;

function InvoiceForm() {
	const expanded = useSelector(getInvoiceFormExpanded);

	return expanded && <Container></Container>;
}

export default InvoiceForm;
