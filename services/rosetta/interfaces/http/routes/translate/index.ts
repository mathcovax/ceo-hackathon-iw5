import { Translate } from "@business/entities/translate";
import { endpointTranslateRoute } from "@interfaces/http/schemas/translate";
import { useMustBeAuthozizeToUse } from "@interfaces/http/security/authentication";
import { GoogleScrape } from "@interfaces/providers/googleScrape";
import { LebackossAPI } from "@interfaces/providers/lebackoss";
import { LibretranslateAPI } from "@interfaces/providers/libretranslate";
import { resultTranslateQueue } from "@interfaces/providers/resultTranslateQueue";
import { submissionDataRules } from "@vendors/entity-rules";
import { match, P } from "ts-pattern";

useMustBeAuthozizeToUse()
	.createRoute("POST", "/translate")
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
						value: zod.string()
							.min(submissionDataRules.textarea.min)
							.max(submissionDataRules.textarea.max),
					}),
				}),
		},
	})
	.handler(
		(pickup) => {
			const { data: { provider, language, text }, token, aIPrestationToken } = pickup(["data", "token", "aIPrestationToken"]);

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

			return new OkHttpResponse("text.translated", { token });
		},
		makeResponseContract(OkHttpResponse, "text.translated", endpointTranslateRoute),
	);
