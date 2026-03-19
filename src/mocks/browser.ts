import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/authHandlers';
import { layerHandlers } from './handlers/layerHandlers';

export const worker = setupWorker(...authHandlers, ...layerHandlers);
