import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: grid;
	justify-items: center;
	padding-top: calc(var(--nav-height) * 1.7);

	@media (min-width: 800px) {
		padding-left: var(--nav-width);
		padding-top: calc(var(--nav-height) - 2rem);
	}
`;
