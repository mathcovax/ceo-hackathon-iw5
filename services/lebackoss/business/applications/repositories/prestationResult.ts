import { type PrestationResult, type PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PrestationResultRepository extends RepositoryBase<PrestationResultEntity> {
	generateId(): PrestationResult.Id;
}

export const prestationResultRepository = createRepositoryHandler<
	PrestationResultRepository
>();
