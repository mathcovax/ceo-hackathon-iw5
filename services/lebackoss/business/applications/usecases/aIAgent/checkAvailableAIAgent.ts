import { aIAgentRepository } from "@business/applications/repositories/aIAgent";
import { prestationSheetRepository } from "@business/applications/repositories/prestationSheet";
import { type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	aIAgent: AIAgentEntity;
}

export class CheckAvailableAIAgentUsecase extends UsecaseHandler.create({
	aIAgentRepository,
	prestationSheetRepository,
}) {
	public async execute({ aIAgent }: Input) {
		const isAvailable = await this.aIAgentRepository.isAvailable(aIAgent);
		if (!isAvailable) {
			const prestationSheet = await this.prestationSheetRepository.getById(
				aIAgent.prestationSheetId,
			);

			const updatedPrestationSheet = prestationSheet.disabled();

			await this.prestationSheetRepository.save(updatedPrestationSheet);

			return new UsecaseError("failed-check-AIAgent-availability", {
				aIAgent,
				prestationSheet,
			});
		}
	}
}
