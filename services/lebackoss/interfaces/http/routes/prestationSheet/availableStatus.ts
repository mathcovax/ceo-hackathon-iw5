import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/presetationSheet";
import { availablePrestationSheetUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/available-prestationsheet-status")
	.extract({
		params: zod.object({
			prestationSheetId: PrestationSheet.idObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPrestationSheetExistById,
		(pickup) => pickup("params").prestationSheetId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { prestationSheet } = pickup(["prestationSheet"]);

			await availablePrestationSheetUsecase.execute({
				prestationSheet,
			});

			return dropper(null);
		},
		[],
	)
	.handler(
		() => new OkHttpResponse("prestationSheet-status.updated"),
		makeResponseContract(OkHttpResponse, "prestationSheet-status.updated"),
	);
