import "../repositories";
import { AvailablePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/availablePrestationSheet";
import { CreatePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/createPrestationSheet";
import { DisabledPrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/disabledPrestationSheet";
import { FindOneAIAgentUsecase } from "@business/applications/usecases/aIAgent/findOneAIAgent";
import { UpdateAIAgentUsecase } from "@business/applications/usecases/aIAgent/updateAIAgent";
import { UpdatePrestationSheetDescriptionFieldsUsecase } from "@business/applications/usecases/prestationSheet/updatePrestationSheet";
import { FindOnePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/findOnePresationSheet";

export const availablePrestationSheetUsecase = new AvailablePrestationSheetUsecase();
export const createPrestationSheetUsecase = new CreatePrestationSheetUsecase();
export const disabledPrestationSheetUsecase = new DisabledPrestationSheetUsecase();
export const updatePrestationSheetDescriptionFieldsUsecase = new UpdatePrestationSheetDescriptionFieldsUsecase();
export const findOnePrestationSheetUsecase = new FindOnePrestationSheetUsecase();

export const findOneAIAgentUsecase = new FindOneAIAgentUsecase();
export const updateAIAgentUsecase = new UpdateAIAgentUsecase();
