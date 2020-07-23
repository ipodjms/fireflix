import { environment } from 'src/environments/environment';

let versionAPI: string;

const URL_BASE = environment.URL_BASE;

versionAPI = `${URL_BASE}`;

export const VERSION_API = versionAPI;
