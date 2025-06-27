import { Translate } from "@business/entities/translate";
import { endpointTranslateRoute } from "@interfaces/http/schemas/translate";
import { authenticationProcess } from "@interfaces/http/security/authentication";
import { GoogleScrape } from "@interfaces/providers/googleScrape";
import { LebackossAPI } from "@interfaces/providers/lebackoss";
import { LibretranslateAPI } from "@interfaces/providers/libretranslate";
import { resultTranslateQueue } from "@interfaces/providers/resultTranslateQueue";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/translate")
	.execute(
		authenticationProcess,
		{ pickup: ["aIAgentToken"] },
	)
	.extract({
		body: {
			aIPrestationToken: zod.string(),
			data: zod
				.object({
					provider: zod.object({
						value: Translate.provider,
					}),
					language: zod.object({
						value: Translate.language,
					}),
					text: zod.object({
						value: zod.string(),
					}),
				}),
		},
	})
	.handler(
		(pickup) => {
			const { data: { provider, language, text }, aIAgentToken, aIPrestationToken } = pickup(["data", "aIAgentToken", "aIPrestationToken"]);

			void resultTranslateQueue.add(async() => {
				void LebackossAPI.startAIPrestation({ aIPrestationToken });

				const resultText = await match(provider.value)
					.with(
						P.union("default", "libretranslate"),
						() => LibretranslateAPI
							.translate(text.value, language.value),
					)
					.with(
						"googleScrape",
						() => GoogleScrape
							.translate(text.value, language.value),
					)
					.exhaustive();

				void LebackossAPI.completeAIPrestation({
					aIPrestationToken,
					resultText,
				});
			});

			return new OkHttpResponse("text.translated", { aIAgentToken });
		},
		makeResponseContract(OkHttpResponse, "text.translated", endpointTranslateRoute),
	);
