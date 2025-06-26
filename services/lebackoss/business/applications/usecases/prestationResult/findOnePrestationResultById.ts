import { prestationResultRepository } from "@business/applications/repositories/prestationResult";
import { type PrestationResult } from "@business/domains/entities/prestationResult";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	prestationResultId: PrestationResult.Id;
}

export class FindOnePrestationResultByIdUsecase extends UsecaseHandler.create({
	prestationResultRepository,
}) {
	public execute({ prestationResultId }: Input) {
		return this.prestationResultRepository.findOneById(prestationResultId);
	}
}
