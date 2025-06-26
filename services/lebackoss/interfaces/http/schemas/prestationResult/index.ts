import { PrestationResult } from "@business/domains/entities/prestationResult";
import { Prestation } from "@business/domains/entities/prestation";
import { prestationResultDataObjecter } from "@business/domains/common/prestationResultData";

export const prestatonResultSchema = zod.object({
	id: PrestationResult.idObjecter.zodSchema,
	prestationId: Prestation.idObjecter.zodSchema,
	data: prestationResultDataObjecter.zodSchema.array(),
});

export const endpointFindOnePrestationResultRoute = prestatonResultSchema;
