export function formatDate(date) {
	const formatter = new Intl.DateTimeFormat(navigator.language || 'eu', {
		month: 'short',
		year: 'numeric',
		day: '2-digit',
	});
	const dateObj = new Date(date);
	return formatter.format(dateObj);
}

export function dateToString(date) {
	const year = date.getFullYear();
	const month = date.getMonth().toString().padStart(2, 0);
	const day = date.getDay().toString().padStart(2, 0);

	return `${year}-${month}-${day}`;
}

export function formatNumber(num) {
	const formatter = new Intl.NumberFormat(navigator.language || 'eu');
	return formatter.format(num);
}
