import React from 'react';
import styled, { css } from 'styled-components';
import { Textbox } from '../../reusables/FormElements';
import deleteIconPath from '../../../assets/images/icon-delete.svg';
import { useField } from 'formik';

const Container = styled.div`
	display: grid;
	gap: 5rem;

	@media (min-width: 900px) {
		gap: 3rem;
	}
`;

const Item = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr 1fr;
	align-items: center;

	@media (min-width: 900px) {
		grid-template-columns: 2fr 7rem 1fr 1.2fr auto;
		&:not(:first-of-type) label {
			display: none;
		}
	}
`;

const Quantity = styled(Textbox)``;

const Total = styled(Textbox)``;

const DeleteIcon = styled.img`
	margin-top: 3rem;
	cursor: pointer;
	height: 2.5rem;

	&:hover {
		opacity: 0.7;
	}

	@media (min-width: 900px) {
		margin-top: 0;
		${({ isFirst }) =>
			isFirst &&
			css`
				margin-top: 2rem;
			`}
	}
`;

const ItemName = styled(Textbox)`
	grid-column: 1/-1;

	@media (min-width: 900px) {
		grid-column: unset;
	}
`;

function ItemList() {
	const [, meta, helpers] = useField('items');

	function handleAddItem() {
		helpers.setValue([
			...meta.value,
			{
				name: '',
				price: '',
				quantity: '',
			},
		]);
	}

	function handleDeleteItem(index) {
		helpers.setValue(meta.value.filter((item, i) => i !== index));
	}

	return (
		<>
			<h3>Item List</h3>
			<Container>
				{meta.value.map((item, i) => {
					return (
						<Item key={i}>
							<ItemName name={`items[${i}].name`} label="ItemName" />
							<Quantity name={`items[${i}].quantity`} label="Quantity" />
							<Textbox name={`items[${i}].price`} label="Price" />
							<Total
								name={`items[${i}].total`}
								label="Total"
								disabled={true}
								value={'£' + +item.price * +item.quantity}
							/>
							<DeleteIcon
								onClick={() => handleDeleteItem(i)}
								isFirst={i === 0}
								src={deleteIconPath}
								alt=""
							/>
						</Item>
					);
				})}

				<button onClick={handleAddItem} type="button" className="btn">
					Add Item
				</button>
			</Container>
		</>
	);
}

export default ItemList;
