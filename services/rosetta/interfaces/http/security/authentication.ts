import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";
import { AIAgentTokenProvider } from "@interfaces/providers/token/aIAgent";

const authenticationProcess = createProcess(
	"authentification",
)
	.extract(
		{
			body: {
				authorization: zod.string(),
			},
		},
		() => new ForbiddenHttpResponse("authorization.missing"),
		new IgnoreByTypeCodegenDescription(),
	)
	.cut(
		({ pickup, dropper }) => {
			const { authorization: token } = pickup(["authorization"]);

			const payloadToken = AIAgentTokenProvider.verify(token);

			if (!payloadToken) {
				return new ForbiddenHttpResponse("authorization.wrong");
			}

			return dropper({ token });
		},
		["token"],
		makeResponseContract(ForbiddenHttpResponse, "authorization.wrong"),
	)
	.exportation(["token"]);

export function useMustBeAuthozizeToUse() {
	return useBuilder()
		.preflight(
			authenticationProcess,
			{
				pickup: ["token"],
			},
		);
}
