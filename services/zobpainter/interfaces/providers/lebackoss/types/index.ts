import { type FindHttpClientRoute, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export type LebackossClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type InputStartAIPrestation = FindHttpClientRoute<
	LebackossClientRoute,
	"POST",
	"/ai-start-prestation"
>["body"];

export interface InputCompleteAIPrestation {
	resultFile: File;
	aIPrestationToken: string;
}
