export function saveTempMailInStorage(email: string) {
	localStorage.setItem("tempMail", email);
}
export function getStorageTempMail() {
	const email = localStorage.getItem("tempMail");
	return email;
}

export function deleteStorageTempMail() {
	localStorage.removeItem("tempMail");
}
