import "@duplojs/types-codegen";
import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";

submissionFieldObjecter.zodSchema._zttIdentifier = "SubmissionField";
PrestationSheet.modeObjecter.zodSchema._zttIdentifier = "PrestationSheetModeObjecter";
