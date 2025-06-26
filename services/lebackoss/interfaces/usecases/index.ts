import "../repositories";
import { AvailablePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/availablePrestationSheet";
import { CreatePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/createPrestationSheet";
import { DisabledPrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/disabledPrestationSheet";
import { FindOneAIAgentUsecase } from "@business/applications/usecases/aIAgent/findOneAIAgent";
import { UpdateAIAgentUsecase } from "@business/applications/usecases/aIAgent/updateAIAgent";
import { UpdatePrestationSheetDescriptionFieldsUsecase } from "@business/applications/usecases/prestationSheet/updatePrestationSheet";
import { FindOnePrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/findOnePresationSheet";
import { CreatePrestationUsecase } from "@business/applications/usecases/prestation/createPrestation";
import { FindOnePrestationUsecase } from "@business/applications/usecases/prestation/findOnePresation";
import { StartPrestationUsecase } from "@business/applications/usecases/prestation/startPrestation";
import { CompletePrestationUsecase } from "@business/applications/usecases/prestation/completePrestation";
import { FindAllPrestationByPrestationSheetUsecase } from "@business/applications/usecases/prestation/findAllPrestation";
import { FindAllPrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/findAllPrestationSheet";

export const availablePrestationSheetUsecase = new AvailablePrestationSheetUsecase();
export const createPrestationSheetUsecase = new CreatePrestationSheetUsecase();
export const createPrestationUsecase = new CreatePrestationUsecase();
export const disabledPrestationSheetUsecase = new DisabledPrestationSheetUsecase();
export const updatePrestationSheetDescriptionFieldsUsecase = new UpdatePrestationSheetDescriptionFieldsUsecase();
export const findOnePrestationSheetUsecase = new FindOnePrestationSheetUsecase();
export const findAllPrestationSheetUsecase = new FindAllPrestationSheetUsecase();

export const findOneAIAgentUsecase = new FindOneAIAgentUsecase();
export const updateAIAgentUsecase = new UpdateAIAgentUsecase();

export const findOnePrestationUsecase = new FindOnePrestationUsecase();
export const startPrestationUsecase = new StartPrestationUsecase();
export const completePrestationUsecase = new CompletePrestationUsecase();
export const findAllPrestationByPrestationSheetUsecase = new FindAllPrestationByPrestationSheetUsecase();
