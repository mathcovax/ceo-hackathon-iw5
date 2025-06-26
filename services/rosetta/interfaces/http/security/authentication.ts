import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";
import { AIAgentTokenProvider } from "@interfaces/providers/token/aIAgent";

export const authenticationProcess = createProcess(
	"authentification",
)
	.extract(
		{
			body: {
				aIAgentToken: zod.string(),
			},
		},
		() => new ForbiddenHttpResponse("authorization.missing"),
		new IgnoreByTypeCodegenDescription(),
	)
	.cut(
		({ pickup, dropper }) => {
			const { aIAgentToken } = pickup(["aIAgentToken"]);

			const payloadToken = AIAgentTokenProvider.verify(aIAgentToken);

			if (!payloadToken) {
				return new ForbiddenHttpResponse("authorization.wrong");
			}

			return dropper({ aIAgentToken });
		},
		["aIAgentToken"],
		makeResponseContract(ForbiddenHttpResponse, "authorization.wrong"),
	)
	.exportation(["aIAgentToken"]);

