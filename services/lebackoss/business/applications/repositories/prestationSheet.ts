import { type PrestationSheet, type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PrestationSheetRepository extends RepositoryBase<PrestationSheetEntity> {
	generateId(): PrestationSheet.Id;
	getById(prestationSheetId: PrestationSheet.Id): Promise<PrestationSheetEntity>;
	findOneById(prestationSheetId: PrestationSheet.Id): Promise<PrestationSheetEntity | null>;
}

export const prestationSheetRepository = createRepositoryHandler<
	PrestationSheetRepository
>();
