import { type PrestationSheet, type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PrestationSheetRepository extends RepositoryBase<PrestationSheetEntity> {
	generateId(): PrestationSheet.Id;
}

export const prestationSheetRepository = createRepositoryHandler<
	PrestationSheetRepository
>();
