import { Form } from 'formik';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Textbox } from '../../reusables/FormElements';

export const Body = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: auto 1fr;
	background: var(--color-overlay);
	width: 100vw;
	height: 100vh;
	z-index: 2;
	padding-top: var(--nav-height);

	@media (min-width: 800px) {
		padding-top: 0;
		padding-left: calc(var(--nav-width) - 2rem);
	}
`;

export const FormContainer = styled(motion.div)`
	width: 80vw;
	min-width: 320px;
	max-width: 800px;
	height: calc(100vh - var(--nav-height));
	display: grid;
	grid-template-rows: auto 1fr auto;
	gap: 3rem;
	background: var(--color-dark);
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;
	padding: 7rem 3rem 2rem 5rem;

	@media (min-width: 800px) {
		height: 100vh;
	}
`;

export const Overlay = styled.div`
	cursor: pointer;
`;

export const FormElement = styled(Form)`
	display: grid;
	gap: 4rem;
	overflow-y: scroll;
	overflow-x: hidden;

	padding-right: 3rem;
`;

export const FormSection = css`
	display: grid;
	gap: 3rem;
`;

export const FormSectionHeading = styled.h4`
	color: var(--color-purple);
	/* margin-bottom: 1em; */
`;

export const Columns = styled.div`
	display: grid;
	gap: 2rem;

	@media (min-width: 600px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1100px) {
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
	}
`;

export const BillFrom = styled.div`
	${FormSection}
`;

export const BillTo = styled.div`
	${FormSection}
`;

export const FormControls = styled.div`
	display: grid;
	gap: 1.5rem;

	@media (min-width: 510px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 720px) {
		grid-template-columns: 1fr 1fr 1fr;
		justify-self: right;
	}
`;
