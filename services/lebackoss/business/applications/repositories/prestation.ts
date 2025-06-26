import { type FileTypeEnum } from "@business/domains/common/submissionField";
import { type AIPrestationEntity, type AIPrestation } from "@business/domains/entities/aIPrestation";
import { type Prestation, type PrestationEntity } from "@business/domains/entities/prestation";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type AllPrestation =
	| PrestationEntity
	| AIPrestationEntity;

export interface PrestationRepository extends RepositoryBase<AllPrestation> {
	generateId(): Prestation.Id;
	findOneById(prestationId: Prestation.Id): Promise<AllPrestation | null>;
	generateToken(aiPrestationId: Prestation.Id): AIPrestation.Token;
	findAllByPrestationSheet(prestationSheet: PrestationSheetEntity): Promise<AllPrestation[]>;
	getFileType(path: string): FileTypeEnum;
}

export const prestationRepository = createRepositoryHandler<
	PrestationRepository
>();
