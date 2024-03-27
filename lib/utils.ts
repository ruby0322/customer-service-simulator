import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function base64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

function intervalToMinutes(interval: string) {
	// e.g. '1 day 00:19:01.394' -> 24*60 + 19
	const parts = interval.split(' ');
	let minutes = 0;

	// If the interval includes days
	if (parts.length === 3) {
		const days = parseInt(parts[0]);
		minutes += days * 24 * 60;
	}

	// Extract hours and minutes from the time part
	const timeParts = parts[parts.length - 1].split(':');
	const hours = parseInt(timeParts[0]);
	const mins = parseInt(timeParts[1]);

	minutes += hours * 60 + mins;

	return minutes;
}

export { base64toBlob, cn, intervalToMinutes };
