import { UsecaseHandler, UsecaseError } from "@vendors/clean";
import { prestationSheetRepository } from "../repositories/prestationSheet";
import { type PrestationSheet, PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { type SubmissionField } from "@business/domains/common/submissionField";
import { AIAgentEntity, type AIAgent } from "@business/domains/entities/aIAgent";
import { aIAgentRepository } from "../repositories/aIAgent";
import { CheckAvailableAIAgentUsecase } from "./checkAvailableAIAgent";
import { match, P } from "ts-pattern";

interface Input {
	mode: PrestationSheet.Mode;
	name: PrestationSheet.Name;
	description: PrestationSheet.Description;
	keywords: PrestationSheet.Keyword[];
	submissionFields: SubmissionField[];

	aIAgent?: {
		pingUrl: AIAgent.PingUrl;
		tokenKey: AIAgent.TokenKey;
		entryPointUrl: AIAgent.EntryPointUrl;
	};
}

export class CreatePrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
	aIAgentRepository,
	checkAIAgent: CheckAvailableAIAgentUsecase,
}) {
	public async execute({
		aIAgent: aIAgentInput,
		...prestationSheetInput
	}: Input) {
		const prestationSheet = PrestationSheetEntity.create({
			...prestationSheetInput,
			id: this.prestationSheetRepository.generateId(),
		});

		await this.prestationSheetRepository.save(prestationSheet);

		return match({
			mode: prestationSheet.mode.value,
			aIAgentInput,
		})
			.with(
				{
					mode: "ai",
					aIAgentInput: P.not(undefined),
				},
				async({ aIAgentInput }) => {
					const aIAgent = AIAgentEntity.create({
						...aIAgentInput,
						prestationSheetId: prestationSheet.id,
						id: this.aIAgentRepository.generateId(),
					});

					await this.aIAgentRepository.save(aIAgent);

					const checkResult = await this.checkAIAgent({
						aIAgent,
						prestationSheet,
					});

					return checkResult;
				},
			)
			.with(
				{
					mode: "ai",
					aIAgentInput: undefined,
				},
				() => new UsecaseError("missing-aIAgentInput"),
			)
			.with(
				{ mode: "humain" },
				() => undefined,
			)
			.exhaustive();
	}
}
