export function toBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => void resolve(reader.result as string);
		reader.onerror = reject;
	});
}
