import { submissionDataObjecter } from "@business/domains/common/submissionData";
import { AIPrestation } from "@business/domains/entities/aIPrestation";
import { Prestation } from "@business/domains/entities/prestation";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";

const prestationSchema = zod.object({
	id: Prestation.idObjecter.zodSchema,
	prestationSheetId: PrestationSheet.idObjecter.zodSchema,
	submissionData: submissionDataObjecter.zodSchema,
	status: Prestation.statusObjecter.zodSchema,
});

export const aIPrestationSchema = prestationSchema.extend({
	token: AIPrestation.tokenObjecter.zodSchema,
});

export const allPrestationSchema = zod.union([
	prestationSchema,
	aIPrestationSchema,
]);

export const endpointFindOnePrestationRoute = allPrestationSchema;

export const endpointFindAllPrestationRoute = allPrestationSchema.array();
