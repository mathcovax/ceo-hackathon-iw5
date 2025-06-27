import { endpointZobRoute } from "@interfaces/http/schemas/zob";
import { authenticationProcess } from "@interfaces/http/security/authentication";
import { LebackossAPI } from "@interfaces/providers/lebackoss";
import { PainterProvider } from "@interfaces/providers/painter";
import { resultQueue } from "@interfaces/providers/resultQueue";

useBuilder()
	.createRoute("POST", "/draw-zob")
	.execute(
		authenticationProcess,
		{ pickup: ["aIAgentToken"] },
	)
	.extract({
		body: {
			aIPrestationToken: zod.string(),
			data: zod.object({
				image: zod.object({
					value: zod.string(),
				}),
			}),
		},
	})
	.handler(
		(pickup) => {
			const { aIAgentToken, data, aIPrestationToken } = pickup(["aIAgentToken", "data", "aIPrestationToken"]);

			void resultQueue.add(
				async() => {
					void LebackossAPI.startAIPrestation({ aIPrestationToken });

					const resultFile = await PainterProvider.drawZob(data.image.value);

					void LebackossAPI.completeAIPrestation({
						aIPrestationToken,
						resultFile,
					});
				},
			);

			return new OkHttpResponse("zobpaint.sucess", { aIAgentToken });
		},
		makeResponseContract(OkHttpResponse, "zobpaint.sucess", endpointZobRoute),
	);

