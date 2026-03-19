export const mockLayers = [
  {
    id: 'osm-base',
    name: 'OpenStreetMap',
    workspaceId: 'ws-1',
    type: 'xyz',
    visible: true,
    opacity: 1,
    zIndex: 0,
    source: {
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    attribution: '© OpenStreetMap contributors'
  },
  {
    id: 'ibge-municipios',
    name: 'Municípios — IBGE',
    workspaceId: 'ws-1',
    type: 'wms',
    visible: true,
    opacity: 0.7,
    zIndex: 10,
    source: {
      url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
      layers: 'CCAR:BC250_Municipio_A',
      params: { FORMAT: 'image/png', TRANSPARENT: 'TRUE' }
    },
    attribution: '© IBGE'
  },
  {
    id: 'ibge-rodovias',
    name: 'Rodovias — IBGE',
    workspaceId: 'ws-1',
    type: 'wms',
    visible: false,
    opacity: 1,
    zIndex: 20,
    source: {
      url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
      layers: 'CCAR:BC250_Trecho_Rodoviario_L',
      params: { FORMAT: 'image/png', TRANSPARENT: 'TRUE' }
    },
    attribution: '© IBGE'
  },
  {
    id: 'pontos-mock',
    name: 'Pontos de interesse (mock)',
    workspaceId: 'ws-1',
    type: 'geojson',
    visible: true,
    opacity: 1,
    zIndex: 30,
    source: {
      url: '/mock/pontos-interesse.geojson'
    },
    style: {
      color: '#E24B4A',
      fillColor: '#FCEBEB',
      strokeWidth: 2,
      strokeColor: '#A32D2D'
    }
  }
];
