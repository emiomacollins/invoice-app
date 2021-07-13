import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { getInvoicesFilter, setInvoicesFilter } from '../../redux/invoicesSlice';
import checkIconPath from '../../assets/images/icon-check.svg';
import ArrowIconPath from '../../assets/images/icon-arrow-right.svg';
import { getFilterBoxExpanded, setFilterBoxExpanded } from '../../redux/uiSlice';

const Container = styled.div`
	position: relative;
	justify-self: right;
`;

const Toggle = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 2rem 0;
	cursor: pointer;
`;

const ToggleLabel = styled.h3`
	letter-spacing: 0.02em;
	line-height: 0;
`;

const ArrowIcon = styled.img`
	transition: 0.3s;
	transform-origin: center;
	display: grid;
	place-content: center;

	${({ rotated }) =>
		rotated &&
		css`
			transform: rotate(90deg);
		`}
`;

const Option = styled.div`
	padding: 1rem;
	display: grid;
	gap: 2rem;
	grid-template-columns: auto 1fr;
	align-items: center;

	label {
		font-weight: 700;
		cursor: pointer;
	}
`;

const CheckBox = styled.input`
	appearance: none;
	background: var(--color-dark);
	width: 2.3rem;
	height: 2.3rem;
	border-radius: 0.3rem;
	transition: 0s, border 0.2s;
	cursor: pointer;
	border: 2px solid transparent;
	outline: none;

	&:hover {
		border-color: var(--color-purple);
	}

	&:checked {
		background: var(--color-purple);
		background-image: url(${checkIconPath});
		background-repeat: no-repeat;
		background-position: center;
		background-size: 70%;
	}
`;

const OptionsContainer = styled.div`
	padding: 2.5rem;
	position: absolute;
	top: 100%;
	right: 0;
	background: var(--color-mid);
	border-radius: var(--border-radius);
	box-shadow: var(--shadow-hard);

	${({ hidden }) =>
		hidden &&
		css`
			display: none;
			pointer-events: none;
		`}
`;

function Filter() {
	const dispatch = useDispatch();
	const expanded = useSelector(getFilterBoxExpanded);
	const invoiceFilter = useSelector(getInvoicesFilter);

	function handleToggleExpanded(e) {
		e.stopPropagation();
		dispatch(setFilterBoxExpanded(!expanded));
	}

	function handleSetFilter(e) {
		if (e.target.value === invoiceFilter) {
			e.target.checked = false;
			dispatch(setInvoicesFilter(''));
			return;
		}

		dispatch(setInvoicesFilter(e.target.value));
	}

	const OptionsList = ['paid', 'pending', 'draft'].map((filter) => {
		return (
			<Option key={filter}>
				<CheckBox
					onChange={handleSetFilter}
					type="checkbox"
					id={filter}
					name="filter"
					value={filter}
					checked={invoiceFilter === filter ? true : false}
				/>
				<label htmlFor={filter}>{filter}</label>
			</Option>
		);
	});

	return (
		<Container>
			<Toggle onClick={handleToggleExpanded}>
				<ToggleLabel className="bold">Filter</ToggleLabel>
				<ArrowIcon src={ArrowIconPath} rotated={!expanded} />
			</Toggle>
			<OptionsContainer onClick={(e) => e.stopPropagation()} hidden={!expanded}>
				{OptionsList}
			</OptionsContainer>
		</Container>
	);
}

export default Filter;
