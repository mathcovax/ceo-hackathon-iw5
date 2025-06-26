import { prestationResultRepository } from "@business/applications/repositories/prestationResult";
import { type Prestation } from "@business/domains/entities/prestation";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	prestationId: Prestation.Id;
}

export class FindOnePrestationResultByPrestationIdUsecase extends UsecaseHandler.create({
	prestationResultRepository,
}) {
	public execute({ prestationId }: Input) {
		return this.prestationResultRepository.findOneByPrestationId(prestationId);
	}
}
