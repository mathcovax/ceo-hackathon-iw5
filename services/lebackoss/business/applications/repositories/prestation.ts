import { type Prestation, type PrestationEntity } from "@business/domains/entities/prestation";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PrestationRepository extends RepositoryBase<PrestationEntity> {
	generateId(): Prestation.Id;
	findOneById(prestationId: Prestation.Id): Promise<PrestationEntity | null>;
}

export const prestationRepository = createRepositoryHandler<
	PrestationRepository
>();
