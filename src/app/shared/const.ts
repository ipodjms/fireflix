import { environment } from 'src/environments/environment';

let labOrganizationAPI: string;
let testOrganizationAPI: string;
let prdOrganizationAPI: string;

let labMetadataAPI: string;
let testMetadataAPI: string;
let prdMetadataAPI: string;

let labOrchestrationAPI: string;
let testOrchestrationAPI: string;
let prdOrchestrationAPI: string;

let labOrchestrationSapAPI: string;
let testOrchestrationSapAPI: string;
let prdOrchestrationSapAPI: string;

let labDataExchangeAPI: string;
let testDataExchangeAPI: string;
let prdDataExchangeAPI: string;

let versionAPI: string;

// 172.20.0.247 Livia Machine

const URL_BASE = {
  production: 'https://teste-8f272.web.app',
  development: 'https://teste-8f272.web.app'
}[Object.entries(environment).find((env) => env[1])[0]];


versionAPI = `${URL_BASE}`;


export const VERSION_API = versionAPI;
