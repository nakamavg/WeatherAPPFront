// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]), // Configura rutas si las tienes
    provideHttpClient(), // Proporciona HttpClient
  ],
}).catch((err) => console.error(err));