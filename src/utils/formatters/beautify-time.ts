export interface BeautifyTimeProps {
	hideHoursIfZero?: boolean;
}

export function beautifyTime(timeInSeconds: number, { hideHoursIfZero = true }: BeautifyTimeProps = {}) {
	if (timeInSeconds < 0) {
		throw new Error(`timeInSeconds must be >= 0, received ${timeInSeconds}`);
	}

	const _seconds = Math.floor(timeInSeconds % 60);
	const _minutes = Math.floor(timeInSeconds / 60) % 60;
	const _hours = Math.floor(timeInSeconds / 3600);

	const seconds = String(_seconds).padStart(2, "0");
	const minutes = String(_minutes).padStart(2, "0");
	const hours = String(_hours).padStart(2, "0");

	if (hideHoursIfZero && _hours === 0) {
		return `${minutes}:${seconds}`;
	}

	return `${hours}:${minutes}:${seconds}`;
}
