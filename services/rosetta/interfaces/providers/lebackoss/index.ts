import { HttpClient, StrictFormData } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type InputCompleteAIPrestation, type InputStartAIPrestation, type LebackossClientRoute } from "./types";

export class LebackossAPI {
	private static httpClient: HttpClient<LebackossClientRoute>;

	public static startAIPrestation(input: InputStartAIPrestation) {
		return this.httpClient
			.post(
				"/ai-start-prestation",
				{
					body: input,
				},
			)
			.iWantInformation("prestation.start");
	}

	public static completeAIPrestation({ aIPrestationToken, resultText }: InputCompleteAIPrestation) {
		return this.httpClient
			.post(
				"/ai-complete-prestation",
				{
					query: {
						aIPrestationToken,
					},
					body: new StrictFormData({
						resultText,
						resultFiles: [],
					}),
				},
			)
			.iWantInformation("prestation.completed");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.LEBACKOSS_BASE_URL,
		});
	}
}
