import { zod } from "@vendors/clean";

export const filesResult = zod.object({
	type: zod.literal("files"),

});

export const prestationResultObjecter = zod
	.object({
		value: zod.string(),
	})
	.createValueObjecter("prestationResult");
