import React from 'react';
import styled from 'styled-components';
import sunImagePath from '../../assets/images/icon-sun.svg';
import moonImagePath from '../../assets/images/icon-moon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, toggleTheme } from '../../redux/themeSlice';
import { useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '../../config';

const Container = styled.div`
	display: grid;
	place-content: center;
	border-right: 0.7px solid var(--color-text-transparent);
	width: var(--nav-width);
	height: 100%;

	@media (min-width: 800px) {
		height: var(--nav-width);
		width: 100%;
		border-bottom: 0.7px solid var(--color-text-transparent);
		border-right: unset;
	}
`;

const Image = styled.img`
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		opacity: 0.7;
	}
`;

function ThemeToggle() {
	const dispatch = useDispatch();
	const theme = useSelector(getTheme);

	useEffect(() => {
		document.querySelector(`html`).className = theme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
	}, [theme]);

	function handleThemeToggle() {
		dispatch(toggleTheme());
	}

	return (
		<Container>
			<Image
				onClick={handleThemeToggle}
				src={theme === 'darkmode' ? sunImagePath : moonImagePath}
				alt=""
			/>
		</Container>
	);
}

export default ThemeToggle;
