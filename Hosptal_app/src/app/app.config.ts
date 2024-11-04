import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';  // Correct usage of 'appRoutes'
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Import withFetch

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),         // Provides routing using the defined routes
    provideClientHydration(),         // Helps with client-side hydration (useful for SSR)
    provideHttpClient(withFetch())    // Globally provides HttpClient with Fetch API enabled
  ]
};
