import "../repositories";
import { AvailablePrestationSheetUsecase } from "@business/applications/usecases/availablePrestationSheet";
import { CreatePrestationSheetUsecase } from "@business/applications/usecases/createPrestationSheet";
import { DisabledPrestationSheetUsecase } from "@business/applications/usecases/disabledPrestationSheet";
import { FindOneAIAgentUsecase } from "@business/applications/usecases/findOneAIAgent";
import { FindOnePrestationSheetUsecase } from "@business/applications/usecases/findOnePresationSheet";
import { UpdateAIAgentUsecase } from "@business/applications/usecases/updateAIAgent";
import { UpdatePrestationSheetDescriptionFieldsUsecase } from "@business/applications/usecases/updatePrestationSheet";

export const availablePrestationSheetUsecase = new AvailablePrestationSheetUsecase();

export const createPrestationSheetUsecase = new CreatePrestationSheetUsecase();
export const disabledPrestationSheetUsecase = new DisabledPrestationSheetUsecase();
export const findOneAIAgentUsecase = new FindOneAIAgentUsecase();
export const updateAIAgentUsecase = new UpdateAIAgentUsecase();
export const updatePrestationSheetDescriptionFieldsUsecase = new UpdatePrestationSheetDescriptionFieldsUsecase();
export const findOnePrestationSheetUsecase = new FindOnePrestationSheetUsecase();
