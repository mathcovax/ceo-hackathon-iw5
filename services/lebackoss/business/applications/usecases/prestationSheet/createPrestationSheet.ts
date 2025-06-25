import { UsecaseHandler } from "@vendors/clean";
import { prestationSheetRepository } from "../../repositories/prestationSheet";
import { PrestationSheet, PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { type SubmissionField } from "@business/domains/common/submissionField";
import { AIAgentEntity, type AIAgent } from "@business/domains/entities/aIAgent";
import { aIAgentRepository } from "../../repositories/aIAgent";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { CheckAvailableAIAgentUsecase } from "../aIAgent/checkAvailableAIAgent";

type Input = SimplifyObjectTopLevel<
	& {
		name: PrestationSheet.Name;
		description: PrestationSheet.Description;
		keywords: PrestationSheet.Keyword[];
		submissionFields: SubmissionField[];
	}
	& (
		| { mode: typeof PrestationSheet.modeEnum["human"] }
		| {
			mode: typeof PrestationSheet.modeEnum["ai"];
			aIAgent: {
				pingUrl: AIAgent.PingUrl;
				tokenKey: AIAgent.TokenKey;
				entryPointUrl: AIAgent.EntryPointUrl;
			};
		}
	)
>;

export class CreatePrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
	aIAgentRepository,
	checkAIAgent: CheckAvailableAIAgentUsecase,
}) {
	public async execute(input: Input) {
		const prestationSheet = PrestationSheetEntity.create({
			...input,
			mode: PrestationSheet.modeObjecter.unsafeCreate(input.mode),
			id: this.prestationSheetRepository.generateId(),
		});

		await this.prestationSheetRepository.save(prestationSheet);

		if (input.mode === "ai") {
			const aIAgent = AIAgentEntity.create({
				...input.aIAgent,
				prestationSheetId: prestationSheet.id,
				id: this.aIAgentRepository.generateId(),
			});

			await this.aIAgentRepository.save(aIAgent);

			const checkResult = await this.checkAIAgent({
				aIAgent,
			});

			return checkResult;
		}
	}
}
