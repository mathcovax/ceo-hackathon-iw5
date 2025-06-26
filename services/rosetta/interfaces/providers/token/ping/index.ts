import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

export class PingTokenProvider {
	private static payloadSchema = ZodAccelerator.build(
		zod.object({
			number: zod.number(),
		}),
	);

	public static verify(token: string) {
		try {
			const payload = jwt.verify(
				token,
				envs.TOKEN_KEY,
				{
					algorithms: ["ES512"],
				},
			);

			return this.payloadSchema.parse(payload);
		} catch {
			return null;
		}
	}
}
