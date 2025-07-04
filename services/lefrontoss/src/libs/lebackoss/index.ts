import { envs } from "@/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export type LebackossClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { sonnerError, sonnerMessage, sonnerWarning } = useSonner();
const { enableLoader, disableLoader } = useLoader();

const defaultRequestTimeout = 5000;

declare module "@duplojs/http-client" {
	interface HttpClientRequestInit {
		disabledLoader?: boolean;
		loaderId?: string;
		timeoutId?: number;
		requestTimeout?: number | boolean;
	}
}

declare global {
	interface Window {
		lebackossClient: HttpClient<LebackossClientRoute>;
	}
}

export const lebackossClient = new HttpClient<LebackossClientRoute>({
	baseUrl: envs.VITE_LEBACKOSS_ENTRYPOINT_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
	})
	.setInterceptor(
		"request",
		(requestDefinition) => {
			if (requestDefinition.paramsRequest.disabledLoader !== true) {
				requestDefinition.paramsRequest.loaderId = enableLoader();
			}

			if (
				!requestDefinition.paramsRequest.signal
				&& requestDefinition.paramsRequest.requestTimeout !== false
			) {
				const requestTimeout = requestDefinition.paramsRequest.requestTimeout;

				const controller = new AbortController();
				requestDefinition.paramsRequest.timeoutId = setTimeout(
					() => {
						void controller.abort();
					},
					requestTimeout === true || !requestTimeout
						? defaultRequestTimeout
						: requestTimeout,
				);

				requestDefinition.paramsRequest.signal = controller.signal;
			}

			return requestDefinition;
		},
	)
	.setInterceptor(
		"response",
		(response) => {
			if (response.requestDefinition.paramsRequest.loaderId) {
				disableLoader(response.requestDefinition.paramsRequest.loaderId);
			}

			if (response.requestDefinition.paramsRequest.timeoutId) {
				clearTimeout(response.requestDefinition.paramsRequest.timeoutId);
			}

			const sonnerMessageKey = `responses.${response.information}`;

			if (i18n.global.te(sonnerMessageKey)) {
				const sonnerMessageContent = i18n.global.t(sonnerMessageKey);

				if (response.ok === true) {
					sonnerMessage(sonnerMessageContent);
				} else if (response.ok === false) {
					sonnerWarning(sonnerMessageContent);
				} else if (response.ok === null) {
					sonnerError(sonnerMessageContent);
				}
			}

			return response;
		},
	);

lebackossClient.hooks.add({
	type: "error",
	callback(_error, requestDefinition) {
		if (requestDefinition.paramsRequest.loaderId) {
			disableLoader(requestDefinition.paramsRequest.loaderId);
		}
	},
});

// three checking bug auto import
window.lebackossClient = lebackossClient;
