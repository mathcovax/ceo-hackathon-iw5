export const submissionFieldRules = {
	name: {
		min: 2,
		max: 50,
	},
	selectTextValue: {
		min: 2,
		max: 50,
		minQuantity: 1,
		maxQuantity: 10,
	},
	fileTypes: {
		minQuantity: 1,
		maxQuantity: 5,
	},
};
