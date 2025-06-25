import jwt from "jsonwebtoken";
import { type AIAgentEntity } from "@business/domains/entities/aIAgent";

export class AIAgentTokenProvider {
	public static generate(aIAgent: AIAgentEntity) {
		const { tokenKey, id } = aIAgent;
		return jwt.sign(
			{ aIAgentId: id.value },
			tokenKey.value,
			{
				algorithm: "ES512",
			},
		);
	}
}
