import React from 'react';
import styled from 'styled-components';
import illustrationPath from '../../assets/images/illustration-empty.svg';

const Container = styled.div`
	display: grid;
	place-content: center;
	min-height: calc(90vh - var(--nav-height) * 3);
	justify-items: center;
	gap: 2rem;
	max-width: 300px;
	margin: auto;
	text-align: center;
`;

const Illustration = styled.img`
	width: 250px;
`;

function NewUserMessage() {
	return (
		<Container>
			<Illustration src={illustrationPath} alt="" />
			<h2>There is nothing here</h2>
			<p>
				Create an invoice by clicking the <span className="bold">New</span> button
				and get started.
			</p>
		</Container>
	);
}

export default NewUserMessage;
