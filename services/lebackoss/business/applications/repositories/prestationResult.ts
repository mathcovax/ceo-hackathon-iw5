import { type AIPrestationEntity } from "@business/domains/entities/aIPrestation";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { type PrestationResult, type PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

type AllPrestation = PrestationEntity | AIPrestationEntity;

export interface PrestationResultRepository extends RepositoryBase<PrestationResultEntity> {
	generateId(): PrestationResult.Id;
	findOneById(id: PrestationResult.Id): Promise<PrestationResultEntity | null>;
	findOneByPrestation(prestation: AllPrestation): Promise<PrestationResultEntity | null>;
}

export const prestationResultRepository = createRepositoryHandler<
	PrestationResultRepository
>();
