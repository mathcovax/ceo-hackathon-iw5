import { endpointCircleRoute } from "@interfaces/http/schemas/circle";
import { authenticationProcess } from "@interfaces/http/security/authentication";
import { LebackossAPI } from "@interfaces/providers/lebackoss";
import { PainterProvider } from "@interfaces/providers/painter";
import { resultQueue } from "@interfaces/providers/resultQueue";

useBuilder()
	.createRoute("POST", "/draw-random-circle")
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
				numberOfCircles: zod.object({
					value: zod.number().optional(),
				}),
				minRadius: zod.object({
					value: zod.number().optional(),
				}),
				maxRadius: zod.object({
					value: zod.number().optional(),
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

					const resultFile = await PainterProvider.drawRandomCircles({
						inputPath: data.image.value,
						numberOfCircles: data.numberOfCircles.value,
						minRadius: data.minRadius.value,
						maxRadius: data.maxRadius.value,
					});

					void LebackossAPI.completeAIPrestation({
						aIPrestationToken,
						resultFile,
					});
				},
			);

			return new OkHttpResponse("circlepaint.sucess", { aIAgentToken });
		},
		makeResponseContract(OkHttpResponse, "circlepaint.sucess", endpointCircleRoute),
	);

