import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom([
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase),
    ]),
    DatePipe, 
  ],
};
