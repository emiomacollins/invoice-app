import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUiMessage, setUiMessage } from '../../redux/uiSlice';

function Message() {
	const dispatch = useDispatch();
	const message = useSelector(getUiMessage);

	function handleHideMessage() {
		dispatch(setUiMessage(''));
	}

	return (
		<AnimatePresence>
			{message && (
				<Overlay onClick={handleHideMessage}>
					<Container
						variants={animations}
						initial="hide"
						animate="show"
						exit="hide"
					>
						{message}
					</Container>
				</Overlay>
			)}
		</AnimatePresence>
	);
}

export default Message;

// STYLES
const animations = {
	hide: { y: -100, x: -50 },
	show: { y: 50, x: -50 },
};

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
