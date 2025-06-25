import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";

export const prestationSheetSchema = zod.object({
	id: PrestationSheet.idObjecter.zodSchema,
	mode: PrestationSheet.modeObjecter.zodSchema,
	status: PrestationSheet.statusObjecter.zodSchema,
	name: PrestationSheet.nameObjecter.zodSchema,
	description: PrestationSheet.descriptionObjecter.zodSchema,
	keywords: PrestationSheet.keywordObjecter.zodSchema.array(),
	submissionFields: submissionFieldObjecter.zodSchema.array(),
});

export const endpointFindAllPrestationSheetRoute = prestationSheetSchema.array();

export const endpointFindOnePrestationSheetRoute = prestationSheetSchema;
