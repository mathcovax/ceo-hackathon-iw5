import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/presetationSheet";
import { disabledPrestationSheetUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/disable-prestationsheet-status")
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

			await disabledPrestationSheetUsecase.execute({
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
