import axios from 'axios';
import { environment } from './environment';

export const api = axios.create({
  baseURL: environment.VITE_API_URL,
  timeout: environment.VITE_API_TIMEOUT,
  headers: { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  }
})

export const enpointMinisterios = '/ministerios'
export const enpointSecretarias = '/secretarias'
export const enpointMinistros = '/ministros'
export const enpointPresidentes = '/presidentes'