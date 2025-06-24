import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/presetationSheet";
import { updatePrestationSheetDescriptionFieldsUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/update-prestation-sheet-description-fields")
	.extract({
		body: zod.object({
			name: PrestationSheet.nameObjecter.toZodSchema(),
			description: PrestationSheet.descriptionObjecter.toZodSchema(),
			keywords: PrestationSheet.keywordObjecter.array().toZodSchema(),
			prestationSheetId: PrestationSheet.idObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPrestationSheetExistById,
		(pickup) => pickup("body").prestationSheetId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { body: { name, description, keywords }, prestationSheet } = pickup(["body", "prestationSheet"]);

			await updatePrestationSheetDescriptionFieldsUsecase.execute({
				name,
				description,
				keywords,
				prestationSheet,
			});

			return dropper(null);
		},
		[],
	)
	.handler(
		() => new OkHttpResponse("prestationSheet.updated"),
		makeResponseContract(OkHttpResponse, "prestationSheet.updated"),
	);
