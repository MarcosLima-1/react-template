export function saveTempCodeInStorage(code: string) {
	localStorage.setItem("tempCode", code);
}
export function getStorageTempCode() {
	const code = localStorage.getItem("tempCode");
	return code;
}

export function deleteStorageTempCode() {
	localStorage.removeItem("tempCode");
}
