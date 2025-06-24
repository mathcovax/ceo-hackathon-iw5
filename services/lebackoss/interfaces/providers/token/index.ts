import jwt from "jsonwebtoken";
import { type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { ZodAccelerator } from "@duplojs/core";

export class TokenProvider {
	private static payloadSchema = ZodAccelerator.build(
		zod.object({
			aIAgentId: zod.string(),
			number: zod.number(),
		}),
	);

	private static algorythm = "ES512" as const;

	public static generate(aIAgent: AIAgentEntity, randNumber: number) {
		const { id, tokenKey } = aIAgent;

		const payload: ReturnType<typeof TokenProvider["payloadSchema"]["parse"]> = {
			aIAgentId: id.value,
			number: randNumber,
		};

		return jwt.sign(
			payload,
			tokenKey.value,
			{
				expiresIn: "100y",
				algorithm: this.algorythm,
			},
		);
	}
}
