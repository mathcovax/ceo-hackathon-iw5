import "@duplojs/types-codegen";
import { fileTypeEnumSchema, submissionFieldObjecter } from "@business/domains/common/submissionField";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { prestationSheetSchema } from "../schemas/prestationSheet";
import { submissionDataObjecter } from "@business/domains/common/submissionData";
import { prestatonResultSchema } from "../schemas/prestationResult";
import { aIPrestationSchema, allPrestationSchema } from "../schemas/prestation";

submissionFieldObjecter.zodSchema._zttIdentifier = "SubmissionField";
PrestationSheet.modeObjecter.zodSchema._zttIdentifier = "PrestationSheetModeObjecter";
prestationSheetSchema._zttIdentifier = "PrestationSheet";
submissionDataObjecter.zodSchema._zttIdentifier = "SubmissionData";
submissionFieldObjecter.zodSchema._zttIdentifier = "SubmissionField";
fileTypeEnumSchema._zttIdentifier = "FileTypeEnum";
prestationSheetSchema._zttIdentifier = "Prestation";
prestatonResultSchema._zttIdentifier = "PrestationResult";
aIPrestationSchema._zttIdentifier = "AIPrestation";
allPrestationSchema._zttIdentifier = "AllPrestation";
