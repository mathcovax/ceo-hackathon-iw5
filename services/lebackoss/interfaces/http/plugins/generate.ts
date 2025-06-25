import "@duplojs/types-codegen";
import { fileTypeEnumSchema, submissionFieldObjecter } from "@business/domains/common/submissionField";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { prestationSheetSchema } from "../schemas/prestationSheet";
import { submissionDataObjecter } from "@business/domains/common/submissionData";

submissionFieldObjecter.zodSchema._zttIdentifier = "SubmissionField";
PrestationSheet.modeObjecter.zodSchema._zttIdentifier = "PrestationSheetModeObjecter";
prestationSheetSchema._zttIdentifier = "PrestationSheet";
submissionDataObjecter.zodSchema._zttIdentifier = "SubmissionData";
submissionFieldObjecter.zodSchema._zttIdentifier = "SubmissionField";
fileTypeEnumSchema._zttIdentifier = "FileTypeEnum";
