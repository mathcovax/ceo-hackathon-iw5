export function getExtention(fileName: string) {
	const extention = fileName.split(".").pop();

	if (!extention) {
		return;
	}

	return `.${extention}`;
}
