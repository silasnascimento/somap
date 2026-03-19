import { http, HttpResponse } from 'msw';
import { mockLayers } from '../data/layers';
import type { LayerConfig } from '../../types';

export const layerHandlers = [
  http.get('/api/workspaces', () => {
    return HttpResponse.json([
      { id: 'ws-1', name: 'Geral', slug: 'geral', description: 'Workspace principal' }
    ]);
  }),

  http.get('/api/layers', ({ request }) => {
    const url = new URL(request.url);
    const workspaceId = url.searchParams.get('workspaceId');
    if (workspaceId) {
      return HttpResponse.json(mockLayers.filter(l => l.workspaceId === workspaceId));
    }
    return HttpResponse.json(mockLayers);
  }),

  http.get('/api/layers/:id/data', async () => {
    // In phase 1, geojson is a static file loaded by openlayers, but we create the mock endpoint just in case
    return new HttpResponse(null, { status: 404 });
  }),

  http.patch('/api/layers/:id', async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json() as Partial<LayerConfig>;
    const layer = mockLayers.find(l => l.id === id);
    if (layer) {
      Object.assign(layer, updates);
      return HttpResponse.json(layer);
    }
    return new HttpResponse(null, { status: 404 });
  })
];
