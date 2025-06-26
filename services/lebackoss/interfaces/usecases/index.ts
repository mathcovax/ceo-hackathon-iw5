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
import { FindAllPrestationUsecase } from "@business/applications/usecases/prestation/findAllPrestation";
import { FindAllPrestationSheetUsecase } from "@business/applications/usecases/prestationSheet/findAllPrestationSheet";
import { FindOnePrestationResultByIdUsecase } from "@business/applications/usecases/prestationResult/findOnePrestationResultById";
import { FindOnePrestationResultByPrestationIdUsecase } from "@business/applications/usecases/prestationResult/findOnePrestationResultByPrestationId";

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
export const findAllPrestationUsecase = new FindAllPrestationUsecase();

export const findOnePrestationResultByIdUsecase = new FindOnePrestationResultByIdUsecase();
export const findOnePrestationResultByPrestationIdUsecase = new FindOnePrestationResultByPrestationIdUsecase();
