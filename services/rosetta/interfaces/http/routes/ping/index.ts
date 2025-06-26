import { endpointPingRoute } from "@interfaces/http/schemas/ping";
import { PingTokenProvider } from "@interfaces/providers/token/ping";

useBuilder()
	.createRoute("POST", "/ping")
	.extract({
		body: {
			pingToken: zod.string(),
		},
	})
	.cut(
		({ pickup, dropper }) => {
			const { pingToken } = pickup(["pingToken"]);

			const result = PingTokenProvider.verify(pingToken);

			if (!result) {
				return new UnauthorizedHttpResponse("wrong.token");
			} else {
				return dropper({ number: result.number });
			}
		},
		["number"],
		makeResponseContract(UnauthorizedHttpResponse, "wrong.token"),
	)
	.handler(
		(pickup) => {
			const { number } = pickup(["number"]);

			return new OkHttpResponse("ping.ok", { number: number * number });
		},
		makeResponseContract(OkHttpResponse, "ping.ok", endpointPingRoute),
	);
