export function useCreatePrestationSheetForm() {
	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			name: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					schema: zod.string(),
				},
			),
			description: useCheckLayout(
				textareaFormField,
				{
					mandatory: true,
					schema: zod.string(),
				},
			),
			submissionFields: useRepeatLayout(
				useUnionLayout(
					[
						[
							"text",
							useMultiFieldLayout({
								fieldName: useCheckLayout(
									textFormField,
									{
										mandatory: true,
										schema: zod.string(),
									},
								),
							}),
						],
						[
							"number",
							useMultiFieldLayout({
								fieldName: useCheckLayout(
									textFormField,
									{
										mandatory: true,
										schema: zod.string(),
									},
								),
							}),
						],
					],
				),
				{ maxItem: 3 },
			),
		}),
	);

	return {
		CreatePrestationSheetForm: Form,
	};
}
