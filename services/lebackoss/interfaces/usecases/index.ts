import "../repositories";
import { AvailablePrestationSheetUsecase } from "@business/applications/usecases/availablePrestationSheet";
import { CreatePrestationSheetUsecase } from "@business/applications/usecases/createPrestationSheet";
import { DisabledPrestationSheetUsecase } from "@business/applications/usecases/disabledPrestationSheet";
import { FindOneAIAgentUsecase } from "@business/applications/usecases/findOneAIAgent";
import { UpdateAIAgentUsecase } from "@business/applications/usecases/updateAIAgent";
import { UpdatePrestationSheet } from "@business/applications/usecases/updatePrestationSheet";

export const availablePrestationSheetUsecase = new AvailablePrestationSheetUsecase();

export const createPrestationSheetUsecase = new CreatePrestationSheetUsecase();
export const disabledPrestationSheetUsecase = new DisabledPrestationSheetUsecase();
export const findOneAIAgentUsecase = new FindOneAIAgentUsecase();
export const updateAIAgentUsecase = new UpdateAIAgentUsecase();
export const updatePrestationSheet = new UpdatePrestationSheet();
