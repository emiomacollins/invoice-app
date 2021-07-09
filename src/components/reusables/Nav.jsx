import React from 'react';
import styled from 'styled-components';
import LogoPath from '../../assets/images/logo.svg';
import ThemeToggle from './ThemeToggle';

const Container = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	height: var(--nav-height);
	width: 100%;
	background: var(--color-mid);
	overflow: hidden;
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

	@media (min-width: 800px) {
		height: 8rem;
		width: 100%;
	}
`;

const ProfilePicture = styled.img`
	height: 4rem;
	width: 4rem;
	border: 2px solid var(--color-purple);
	object-fit: cover;
	border-radius: 100%;
	/* cursor: pointer; */
	transition: 0.3s;

	.lightmode & {
		border-color: var(--color-text);
	}

	/* &:hover {
		border-color: var(--color-purple);
	} */
`;

function Nav() {
	return (
		<Container>
			<LogoContainer>
				<Logo src={LogoPath} alt="" />
			</LogoContainer>
			<ThemeToggle />
			<ProfileContainer>
				<ProfilePicture
					src="https://expertphotography.com/wp-content/uploads/2018/10/cool-profile-picture-natural-light.jpg"
					alt=""
				/>
			</ProfileContainer>
		</Container>
	);
}

export default Nav;
