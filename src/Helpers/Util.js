export function formatDate(date) {
	const formatter = new Intl.DateTimeFormat(navigator.language || 'eu', {
		month: 'short',
		year: 'numeric',
		day: '2-digit',
	});

	// this function recieves an ISO date string which is the format
	// dates are stored when creating an invoice
	const dateObj = new Date(date);
	return formatter.format(dateObj);
}

export function formatNumber(num) {
	const formatter = new Intl.NumberFormat(navigator.language || 'eu');
	return formatter.format(num);
}
