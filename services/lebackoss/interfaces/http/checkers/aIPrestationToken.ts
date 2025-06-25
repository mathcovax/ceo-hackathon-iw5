import { type AIPrestation } from "@business/domains/entities/aIPrestation";
import { AIPrestationTokenProvider } from "@interfaces/providers/token/prestation";

export const aIPrestationTokenCheck = createChecker("aIPrestationToken")
	.handler(
		(input: AIPrestation.Token, output) => {
			const prestationId = AIPrestationTokenProvider.verify(input);

			if (prestationId) {
				return output("aIPrestationToken.valid", prestationId);
			} else {
				return output("aIPrestationToken.invalid", null);
			}
		},
	);

export const iWantAIPrestationTokenIsValid = createPresetChecker(
	aIPrestationTokenCheck,
	{
		result: "aIPrestationToken.valid",
		catch: () => new NotFoundHttpResponse("aIPrestationToken.invalid"),
		indexing: "prestationId",
	},
	makeResponseContract(NotFoundHttpResponse, "aIPrestationToken.invalid"),
);
