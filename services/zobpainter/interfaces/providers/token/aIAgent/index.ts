import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

export class AIAgentTokenProvider {
	private static payloadSchema = ZodAccelerator.build(
		zod.object({
			aIAgentId: zod.string(),
		}),
	);

	public static verify(token: string) {
		try {
			const payload = jwt.verify(
				token,
				envs.TOKEN_KEY,
				{
					algorithms: ["HS256"],
				},
			);

			return this.payloadSchema.parse(payload);
		} catch {
			return null;
		}
	}
}
