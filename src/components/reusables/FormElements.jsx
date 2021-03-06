import { useField } from 'formik';
import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import calendarIconPath from '../../assets/images/icon-calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerComponent from 'react-datepicker';
import { formatDate } from '../../Helpers/Util';

const FormControl = styled.div`
	display: grid;
	gap: 1rem;
	position: relative;
`;

const FormBox = css`
	padding: 1.7rem;
	background: var(--color-mid);
	border: 1px solid var(--color-light);
	border-radius: 0.3rem;
	transition: 0.3s;
	outline: none;
	color: var(--color-text);
	min-width: 0rem;
	font-weight: 700;

	.lightmode & {
		border-color: var(--color-gray-light);
	}
`;

const TextboxEl = styled.input`
	${FormBox}

	.lightmode & {
		color: #000;
	}

	&::placeholder {
		color: inherit;
		opacity: 0.7;
	}

	${({ isInvalid }) =>
		isInvalid &&
		css`
			border-color: var(--color-error) !important;
		`}

	&:focus {
		border-color: var(--color-purple);
	}
`;

const Label = styled.label`
	font-size: var(--size-300);
	color: var(--color-text);
	text-transform: capitalize;
`;

const SelectEl = styled.select`
	${FormBox}
	box-shadow: none;
	color: var(--color-white);
`;

const Button = styled.button`
	${FormBox}
	width: 100%;
	position: relative;
	color: var(--color-white);
`;

const DatePickerIcon = styled.img`
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
`;

export function Textbox({ className, ...props }) {
	const [fields, meta] = useField(props);
	const { name, label, ...otherprops } = props;

	return (
		<FormControl className={className}>
			{label && <Label htmlFor="name">{label}</Label>}
			<TextboxEl
				isInvalid={meta.touched && meta.error}
				id={name}
				{...fields}
				{...otherprops}
			></TextboxEl>
		</FormControl>
	);
}

export function Select(props) {
	const [fields] = useField(props);
	const { name, label, ...otherprops } = props;

	return (
		<FormControl>
			<Label htmlFor="name">{label}</Label>
			<SelectEl {...fields} {...otherprops} />
		</FormControl>
	);
}

const CustomInput = forwardRef(({ value, onClick }, ref) => (
	// value : a string date value i.e 10/23/2020
	// onClick : toggles the calendar visibility
	<Button type="button" onClick={onClick} ref={ref}>
		{formatDate(new Date(value))}
		<DatePickerIcon src={calendarIconPath} alt="" />
	</Button>
));

export function DatePicker(props) {
	const [fields, , helpers] = useField(props);
	const { name, label, ...otherprops } = props;

	return (
		// the styles fixes a spacing bug,  can't use grid cus it adds an unnecessary gap
		// under the datepicker button when the calendar visibility is toggled
		<FormControl style={{ gap: 0 }}>
			<Label htmlFor="name" style={{ marginBottom: '1rem' }}>
				{label}
			</Label>

			<DatePickerComponent
				{...fields}
				{...otherprops}
				selected={fields.value}
				onChange={(e) => {
					helpers.setValue(e);
				}}
				customInput={<CustomInput />}
			/>
		</FormControl>
	);
}
