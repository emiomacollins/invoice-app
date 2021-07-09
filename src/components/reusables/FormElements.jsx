// install formik to use these reusable forms
// you can refactor this file later to add more
// form elements & styles

import { useField } from 'formik';
import React from 'react';
import styled, { css } from 'styled-components';

const TextboxEl = styled.input`
	padding: 1rem;
	transition: 0.3s;

	${({ isInvalid }) =>
		isInvalid &&
		css`
			border-color: var(--color-error);
		`}
`;

const CheckboxEl = styled.input`
	border: 1px solid black;
	display: inline-block;
`;

const SelectEl = styled.select`
	padding: 1rem;
`;

export function Textbox(props) {
	const [fields, meta] = useField(props);
	const { name, ...otherprops } = props;

	return (
		<TextboxEl
			isInvalid={meta.touched && !!meta.error}
			className="form__input"
			{...fields}
			{...otherprops}
		></TextboxEl>
	);
}

export function CheckBox(props) {
	const [fields] = useField({ ...props, type: 'checkbox' });
	const { name, label, ...otherprops } = props;

	return (
		<>
			<CheckboxEl type="checkbox" {...fields} {...otherprops}></CheckboxEl>
			<label className="form__label">{label}</label>
		</>
	);
}

export function Select(props) {
	const [fields] = useField({ ...props });
	const { name, ...otherprops } = props;

	return <SelectEl {...fields} {...otherprops}></SelectEl>;
}
