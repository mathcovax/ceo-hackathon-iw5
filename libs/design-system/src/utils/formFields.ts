import "./layoutTemplate";
import DSInput from "../components/ui/input/DSInput.vue";
import { createFormField } from "../composables/useFormBuilder";
import CheckboxTemplate from "../components/form/CheckboxTemplate.vue";
import DSTextarea from "../components/ui/textarea/DSTextarea.vue";
import SelectTemplate, { type SelectItem } from "../components/form/SelectTemplate.vue";
import SelectStringTemplate from "../components/form/SelectStringTemplate.vue";
import MultiComboboxTemplate, { type MultiComboboxItem } from "../components/form/MultiComboboxTemplate.vue";
import DSDatePicker from "../components/DSDatePicker.vue";
import DSNumberField from "../components/ui/number-field/DSNumberField.vue";
import DSInputFile from "../components/ui/input/DSInputFile.vue";

export const textFormField = createFormField(DSInput, {
	defaultValue: "",
	props: {},
});

export const booleanFormField = createFormField(CheckboxTemplate, {
	defaultValue: false,
	props: { label: "" },
});

export const textareaFormField = createFormField(DSTextarea, {
	defaultValue: "",
	props: {},
});

export const selectFormField = createFormField(SelectTemplate, {
	defaultValue: null as SelectItem | null,
	props: {
		items: [],
		placeholder: "",
	},
});

export const selectStringFormField = createFormField(SelectStringTemplate, {
	defaultValue: null as string | null,
	props: {
		items: [],
		placeholder: "",
	},
});

export const multiComboBoxFormField = createFormField(MultiComboboxTemplate, {
	defaultValue: [] as MultiComboboxItem[],
	props: {
		placeholder: "",
		emptyLabel: "",
		items: [],
	},
});

export const dateFormField = createFormField(DSDatePicker, {
	defaultValue: null as null | string,
	props: {},
});

export const numberFormFiels = createFormField(DSNumberField, {
	defaultValue: 0,
	props: {},
});

export const fileFormFiels = createFormField(DSInputFile, {
	defaultValue: null as null | File,
	props: {},
});
