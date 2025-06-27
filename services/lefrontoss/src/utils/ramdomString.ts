const formatValue = 36;
const defaultLength = 20;
const sliceCount = 2;
const startSlice = 0;

export function randomString(length = defaultLength) {
	return Array.from({ length })
		.reduce<string>(
			(acc) => `${acc}${Math.random().toString(formatValue).slice(sliceCount)}`,
			"",
		)
		.slice(startSlice, length);
}
