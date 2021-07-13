import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import LogoPath from '../../assets/images/logo.svg';
import anynomusIconPath from '../../assets/images/anynomusIcon.svg';
import { getUser } from '../../redux/userSlice';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { auth } from '../../firebase/firebaseUtil';
import {
	getUserProfilePopupExpanded,
	setUserProfilePopupExpanded,
} from '../../redux/uiSlice';

const Container = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	height: var(--nav-height);
	width: 100%;
	background: var(--color-mid);
	/* overflow: hidden; */
	display: grid;
	grid-template-columns: 1fr auto auto;
	justify-items: left;
	align-items: center;
	z-index: 99;
	box-shadow: var(--shadow-bottom);

	.lightmode & {
		background: var(--color-gray);
	}

	@media (min-width: 800px) {
		height: 100vh;
		width: var(--nav-width);
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		grid-template-columns: unset;
		grid-template-rows: 1fr auto auto;
		align-content: flex-end;
		align-items: unset;
	}
`;

const LogoContainer = styled.div`
	background: var(--color-purple);
	height: 100%;
	width: var(--nav-width);
	display: grid;
	place-content: center;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 2rem;

	@media (min-width: 800px) {
		height: var(--nav-width);
		width: 100%;
	}
`;

const Logo = styled.img`
	height: 3.6rem;
	cursor: pointer;
`;

const ProfileContainer = styled.div`
	height: 100%;
	width: var(--nav-width);
	display: grid;
	place-content: center;
	position: relative;

	@media (min-width: 800px) {
		height: 8rem;
		width: 100%;
	}
`;

const Popup = styled.div`
	position: absolute;
	top: 110%;
	right: 10%;
	background: var(--color-mid);
	box-shadow: var(--shadow-light);
	width: max-content;
	padding: 2rem 1rem;
	border-radius: var(--border-radius);
	opacity: 0;
	pointer-events: none;
	transition: 0.2s;

	@media (min-width: 800px) {
		bottom: 10%;
		left: 110%;
		top: unset;
		right: unset;
	}

	${({ expanded }) =>
		expanded &&
		css`
			opacity: 1;
			pointer-events: visible;
		`}
`;

const ProfilePicture = styled.img`
	height: 4rem;
	width: 4rem;
	border: 2px solid var(--color-purple);
	object-fit: cover;
	border-radius: 100%;
	cursor: pointer;
	transition: 0.3s;

	.lightmode & {
		border-color: var(--color-text);
	}
`;

function Nav() {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const popupExpanded = useSelector(getUserProfilePopupExpanded);

	function handleTogglePopupExpanded() {
		dispatch(setUserProfilePopupExpanded(!popupExpanded));
	}

	function handleSignOut() {
		handleTogglePopupExpanded();
		user.isAnonymous ? user.delete() : auth.signOut();
	}

	return (
		<Container>
			<LogoContainer>
				<Link to="/">
					<Logo src={LogoPath} alt="" />
				</Link>
			</LogoContainer>

			<ThemeToggle />

			{user && (
				<ProfileContainer>
					<Popup expanded={popupExpanded}>
						<button onClick={handleSignOut} className="btn btn--small">
							Sign out
						</button>
					</Popup>

					<ProfilePicture
						onClick={handleTogglePopupExpanded}
						src={user.photoURL || anynomusIconPath}
						onError={(e) => (e.target.src = anynomusIconPath)}
						alt=""
					/>
				</ProfileContainer>
			)}
		</Container>
	);
}

export default Nav;
