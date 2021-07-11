import React from 'react';
import styled from 'styled-components';
import { signInAsGuest, signInWithGoogle } from '../../firebase/firebaseUtil';
import { Columns } from './Form/InvoiceFormStyles';

const Container = styled.div`
	display: grid;
	place-content: center;
	height: 80vh;
`;

const Heading = styled.h1`
	text-align: center;
`;

function Login() {
	function handleSignInWithGoogle() {
		signInWithGoogle();
	}

	function handleSignInAsGuest() {
		signInAsGuest();
	}

	return (
		<Container>
			<Heading>Sign in</Heading>
			<Columns>
				<button onClick={handleSignInWithGoogle} className="btn">
					With Google
				</button>
				<button onClick={handleSignInAsGuest} className="btn btn--gray">
					As Guest
				</button>
			</Columns>
		</Container>
	);
}

export default Login;
