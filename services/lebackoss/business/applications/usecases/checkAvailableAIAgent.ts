import { type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { aIAgentRepository } from "../repositories/aIAgent";
import { prestationSheetRepository } from "../repositories/prestationSheet";

interface Input {
	prestationSheet: PrestationSheetEntity;
	aIAgent: AIAgentEntity;
}

export class CheckAvailableAIAgentUsecase extends UsecaseHandler.create({
	aIAgentRepository,
	prestationSheetRepository,
}) {
	public async execute({ aIAgent, prestationSheet }: Input) {
		const isAvailable = await this.aIAgentRepository.isAvailable(aIAgent);
		if (!isAvailable) {
			const updatedPrestationSheet = prestationSheet.disabled();

			await this.prestationSheetRepository.save(updatedPrestationSheet);

			return new UsecaseError("faild-check-AIAgent-availability", {
				aIAgent,
				prestationSheet,
			});
		}
	}
}
