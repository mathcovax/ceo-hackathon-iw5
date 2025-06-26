import { prestationResultRepository } from "@business/applications/repositories/prestationResult";
import { type AIPrestationEntity } from "@business/domains/entities/aIPrestation";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	prestation: PrestationEntity | AIPrestationEntity;
}

export class FindOnePrestationResultByPrestationUsecase extends UsecaseHandler.create({
	prestationResultRepository,
}) {
	public execute({ prestation }: Input) {
		return this.prestationResultRepository.findOneByPrestation(prestation);
	}
}
