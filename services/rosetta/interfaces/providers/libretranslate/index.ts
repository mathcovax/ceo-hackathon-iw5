/* eslint-disable id-length */
import { HttpClient, type TransformCodegenRouteToHttpClientRoute, StrictFormData, type FindHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "./types";
import { envs } from "@interfaces/envs";
import { type Translate } from "@business/entities/translate";

export type LibretranslateClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type SupportedLanguage = FindHttpClientRoute<
	LibretranslateClientRoute,
	"POST",
	"/translate"
>["body"]["data"]["target"];

const languageMapper: Record<Translate.Language, SupportedLanguage> = {
	"fr-FR": "fr",
	"en-US": "en",
	"it-IT": "it",
	"es-ES": "es",
};

export class LibretranslateAPI {
	private static httpClient: HttpClient<LibretranslateClientRoute>;

	public static async translate(text: string, language: Translate.Language) {
		const result = await this.httpClient.post(
			"/translate",
			{
				body: new StrictFormData({
					format: "text",
					source: "auto",
					target: languageMapper[language],
					q: text,
				}),
			},
		)
			.iWantCode("200");

		return result.body.translatedText;
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.LIBRETRANSLATE_BASE_URL,
		});
	}
}
