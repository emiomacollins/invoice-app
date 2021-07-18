import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUiMessage, setUiMessage } from '../../redux/uiSlice';

const Container = styled(motion.div)`
	padding: 2rem;
	background: var(--color-purple);
	color: #fff;
	position: fixed;
	top: var(--nav-height);
	left: calc(50% - var(--nav-width) / 2);
	border-radius: var(--border-radius);
	text-align: center;

	@media (min-width: 800px) {
		top: 0;
		left: 50%;
	}
`;

const Overlay = styled.div`
	z-index: 99;
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: var(--color-overlay);
`;

function Message() {
	const message = useSelector(getUiMessage);
	const dispatch = useDispatch();

	function handleClose() {
		dispatch(setUiMessage(''));
	}

	return (
		<AnimatePresence>
			{message && (
				<Overlay onClick={handleClose}>
					<Container
						initial={{ y: -100, x: -50 }}
						animate={{ y: 50, x: -50 }}
						exit={{ y: -100, x: -50 }}
					>
						{message}
					</Container>
				</Overlay>
			)}
		</AnimatePresence>
	);
}

export default Message;
