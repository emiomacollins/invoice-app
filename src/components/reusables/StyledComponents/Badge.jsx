import styled, { css } from 'styled-components';
import React from 'react';

const Container = styled.div`
	justify-self: right;
	min-width: 10rem;
	border-radius: var(--border-radius);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	font-weight: 700;
	padding: 0 2rem;

	${({ status }) => {
		switch (status) {
			case 'pending':
				return css`
					background: var(--color-orange-transparent);
					color: var(--color-orange);
				`;
			case 'paid':
				return css`
					background: var(--color-green-transparent);
					color: var(--color-green);
				`;
			case 'draft':
				return css`
					background: var(--color-gray-transparent);
					color: var(--color-gray);
				`;

			default:
				return ``;
		}
	}}
`;

const Icon = styled.div`
	width: 1rem;
	height: 1rem;
	border-radius: 100%;
	display: inline-block;

	${({ status }) => {
		switch (status) {
			case 'pending':
				return css`
					background: var(--color-orange);
				`;
			case 'paid':
				return css`
					background: var(--color-green);
				`;
			case 'draft':
				return css`
					background: var(--color-gray);
				`;

			default:
				return ``;
		}
	}}
`;

function Badge({ status }) {
	return (
		<Container status={status}>
			<Icon status={status} />
			{status}
		</Container>
	);
}

export default Badge;
