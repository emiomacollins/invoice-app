import React from 'react';

export function ArrowLeft(props) {
	return (
		<svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.342.886L2.114 5.114l4.228 4.228"
				stroke="#9277FF"
				strokeWidth="2"
				fill="none"
				fillRule="evenodd"
				{...props}
			/>
		</svg>
	);
}

export function PlusIcon(props) {
	return (
		<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
				fill="#7C5DFA"
				fillRule="nonzero"
				{...props}
			/>
		</svg>
	);
}
