import styled, { css } from 'styled-components';

export const Card = css`
	box-shadow: var(--shadow);
	padding: 3rem;
	background: var(--color-mid);
	border-radius: var(--border-radius);
	p {
		line-height: 1.9;
	}
`;

export const Status = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;

	@media (min-width: 900px) {
		justify-content: left;
	}
`;

export const Controls = styled.div`
	${Card}
	display: grid;
	row-gap: 2rem;

	@media (min-width: 900px) {
		grid-template-columns: 1fr repeat(3, auto);
	}
`;

export const Columns = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 1rem;
	justify-content: right;

	@media (max-width: 370px) {
		display: grid;
		grid-auto-flow: row;
		justify-content: stretch;
	}
`;

export const Details = styled.div`
	${Card}
	display: grid;
	gap: 6rem;

	@media (min-width: 500px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1000px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const DetailsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	grid-column: 1/-1;
`;

export const Title = styled.div`
	display: grid;
	gap: 1rem;
	align-content: flex-start;
`;

export const Address = styled.div`
	text-align: right;
`;

export const ClientAddress = styled.div``;

export const Dates = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	justify-content: space-between;
	padding-bottom: 1rem;
`;

export const BillTo = styled.div`
	display: grid;
	gap: 1rem;

	@media (min-width: 500px) {
		justify-self: right;
		text-align: right;
	}

	@media (min-width: 900px) {
		justify-self: center;
		text-align: left;
	}
`;

export const Email = styled.div`
	grid-column: 1/-1;

	@media (min-width: 1000px) {
		text-align: right;
		justify-self: right;
		grid-column: unset;
	}
`;

export const Bill = styled.div`
	${Card}
	padding: 0;
	overflow: hidden;
	grid-column: 1/-1;
	box-shadow: var(--shadow);
	background: var(--color-light);
`;

export const BillDetails = styled.div`
	display: grid;
	gap: 2rem;
	padding: 4rem;
`;

export const BillRow = styled.div`
	display: grid;
	text-align: right;
	gap: 3rem;
	grid-template-columns: auto 1fr;

	@media (min-width: 700px) {
		grid-template-columns: 2fr 0.5fr 1.5fr 2.5fr;
	}

	.name {
		text-align: left;
	}

	.quantity {
		text-align: center;
		display: none;
		@media (min-width: 700px) {
			display: unset;
		}
	}

	.price {
		color: var(--color-gray);
		white-space: nowrap;
		display: none;
		@media (min-width: 700px) {
			display: unset;
		}
	}

	.total {
		white-space: nowrap;
	}
`;

export const BillTotal = styled.div`
	display: grid;
	text-align: right;
	padding: 4rem;
	background: var(--color-black);
	grid-template-columns: 1fr;
	gap: 1rem;

	@media (min-width: 500px) {
		grid-template-columns: auto 1fr;
	}
`;
