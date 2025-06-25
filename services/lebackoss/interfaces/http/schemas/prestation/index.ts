import { submissionDataObjecter } from "@business/domains/common/submissionData";
import { Prestation } from "@business/domains/entities/prestation";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";

const prestationSchema = zod.object({
	id: Prestation.idObjecter.zodSchema,
	prestationSheetId: PrestationSheet.idObjecter.zodSchema,
	submissionData: submissionDataObjecter.zodSchema,
	status: Prestation.statusObjecter.zodSchema,
});

export const endpointFindAllPrestationRoute = prestationSchema.array();
