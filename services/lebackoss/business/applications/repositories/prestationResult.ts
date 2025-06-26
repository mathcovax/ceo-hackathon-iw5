import { type Prestation } from "@business/domains/entities/prestation";
import { type PrestationResult, type PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PrestationResultRepository extends RepositoryBase<PrestationResultEntity> {
	generateId(): PrestationResult.Id;
	findOneById(id: PrestationResult.Id): Promise<PrestationResultEntity | null>;
	findOneByPrestationId(prestationId: Prestation.Id): Promise<PrestationResultEntity | null>;
}

export const prestationResultRepository = createRepositoryHandler<
	PrestationResultRepository
>();
