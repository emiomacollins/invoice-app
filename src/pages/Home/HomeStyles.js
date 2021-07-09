import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: grid;
	padding: calc(var(--nav-height) * 1.5) 0;
	gap: 5rem;

	@media (min-width: 800px) {
		/* top right bottom left */
		padding: calc(var(--nav-height) - 4rem) 0 calc(var(--nav-height) - 4rem)
			var(--nav-width);
	}
`;
