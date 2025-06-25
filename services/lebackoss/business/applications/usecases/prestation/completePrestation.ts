import { prestationRepository } from "@business/applications/repositories/prestation";
import { prestationResultRepository } from "@business/applications/repositories/prestationResult";
import { type PrestationResultData } from "@business/domains/common/prestationResultData";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	prestation: PrestationEntity;
	prestationResultData: PrestationResultData[];
}

export class CompletePrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
	prestationResultRepository,
}) {
	public async execute({ prestation, prestationResultData }: Input) {
		const updatePrestation = prestation.complete();

		if (updatePrestation instanceof Error) {
			return new UsecaseError("error-while-completing", { error: updatePrestation });
		}

		await this.prestationRepository.save(updatePrestation);

		const prestationResult = PrestationResultEntity.create({
			id: this.prestationResultRepository.generateId(),
			prestationId: prestation.id,
			data: prestationResultData,
		});

		await this.prestationResultRepository.save(prestationResult);
	}
}
