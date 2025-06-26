import jwt from "jsonwebtoken";
import { type AIAgentEntity } from "@business/domains/entities/aIAgent";

export class PingTokenProvider {
	public static generate(aIAgent: AIAgentEntity, randNumber: number) {
		const { tokenKey } = aIAgent;
		return jwt.sign(
			{ number: randNumber },
			tokenKey.value,
			{
				algorithm: "HS256",
			},
		);
	}
}
