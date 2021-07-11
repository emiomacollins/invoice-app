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
	grid-template-columns: 7rem 1fr 1.2fr auto;
	align-items: center;

	@media (min-width: 900px) {
		grid-template-columns: 2fr 7rem 1fr 1.2fr auto;
		&:not(:first-of-type) label {
			display: none;
		}
	}
`;

const DeleteIcon = styled.img`
	margin-top: 2rem;
	cursor: pointer;

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
	const [fields, meta, helpers] = useField('items');

	return (
		<Container>
			{meta.value.map((item, i) => {
				return (
					<Item key={i}>
						<ItemName name={`items[${i}].name`} label="ItemName" />
						<Textbox name={`items[${i}].quantity`} label="Quantity" />
						<Textbox name={`items[${i}].price`} label="Price" />
						<Textbox
							name={`items[${i}].total`}
							label="Total"
							disabled={true}
							value={'£' + item.price * +item.quantity}
						/>
						<DeleteIcon
							onClick={() => {
								helpers.setValue(
									meta.value.filter((item, index) => index !== i)
								);
							}}
							isFirst={i === 0}
							src={deleteIconPath}
							alt=""
						/>
					</Item>
				);
			})}

			<button
				onClick={() => {
					helpers.setValue([
						...meta.value,
						{
							name: '',
							price: '',
							quantity: '',
						},
					]);
				}}
				type="button"
				className="btn"
			>
				Add Item
			</button>
		</Container>
	);
}

export default ItemList;
