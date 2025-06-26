import jwt from "jsonwebtoken";
import { Prestation } from "@business/domains/entities/prestation";
import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import { AIPrestation } from "@business/domains/entities/aIPrestation";

export class AIPrestationTokenProvider {
	private static schema = ZodAccelerator.build(
		zod.object({
			prestationId: zod.string(),
		}),
	);

	public static generate(prestationId: Prestation.Id) {
		const rawToken = jwt.sign(
			{ prestationId: prestationId.value } satisfies ReturnType<typeof AIPrestationTokenProvider["schema"]["parse"]>,
			envs.PRESTATION_TOKEN_KEY,
			{
				algorithm: "HS256",
			},
		);

		return AIPrestation.tokenObjecter.unsafeCreate(rawToken);
	}

	public static verify(token: AIPrestation.Token) {
		try {
			const content = jwt.verify(
				token.value,
				envs.PRESTATION_TOKEN_KEY,
				{
					algorithms: ["HS256"],
				},
			);

			const { prestationId } = this.schema.parse(content);

			return Prestation.idObjecter.unsafeCreate(prestationId);
		} catch {
			return null;
		}
	}
}
