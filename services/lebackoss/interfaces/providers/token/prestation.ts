import jwt from "jsonwebtoken";
import { Prestation, type PrestationEntity } from "@business/domains/entities/prestation";
import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";

export class PrestationTokenProvider {
	private static schema = ZodAccelerator.build(
		zod.object({
			prestationId: zod.string(),
		}),
	);

	public static generate(prestation: PrestationEntity) {
		return jwt.sign(
			{ prestationId: prestation.id.value } satisfies ReturnType<typeof PrestationTokenProvider["schema"]["parse"]>,
			envs.PRESTATION_TOKEN_KEY,
			{
				algorithm: "ES512",
			},
		);
	}

	public static verify(token: string) {
		try {
			const content = jwt.verify(
				token,
				envs.PRESTATION_TOKEN_KEY,
				{
					algorithms: ["ES512"],
				},
			);

			const { prestationId } = this.schema.parse(content);

			return Prestation.idObjecter.unsafeCreate(prestationId);
		} catch {
			return null;
		}
	}
}
