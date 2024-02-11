import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { Amplify } from 'aws-amplify';
import config  from './amplifyconfiguration.json';

Amplify.configure(config);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
