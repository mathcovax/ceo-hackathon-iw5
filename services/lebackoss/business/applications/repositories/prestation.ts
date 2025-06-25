import { type AIPrestationEntity, type AIPrestation } from "@business/domains/entities/aIPrestation";
import { type Prestation, type PrestationEntity } from "@business/domains/entities/prestation";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type AllPrestation =
	| PrestationEntity
	| AIPrestationEntity;

export interface PrestationRepository extends RepositoryBase<AllPrestation> {
	generateId(): Prestation.Id;
	findOneById(prestationId: Prestation.Id): Promise<AllPrestation | null>;
	generateToken(): AIPrestation.Token;
}

export const prestationRepository = createRepositoryHandler<
	PrestationRepository
>();
