
import.meta.env.VITE_API_URL
import.meta.env.VITE_API_TIMEOUT

export const environment = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 180000,
    VITE_API_URL: import.meta.env.VITE_API_URL || 'https=//localhost:8080',
}

