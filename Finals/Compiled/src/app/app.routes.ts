// app.routes.ts
import { Routes } from '@angular/router';
import { TemplateDemoComponent } from './template-demo/template-demo';
import { ReactiveDemoComponent } from './reactive-demo/reactive-demo';

export const routes: Routes = [
  { path: '', redirectTo: 'template', pathMatch: 'full' },
  { path: 'template', component: TemplateDemoComponent },
  { path: 'reactive', component: ReactiveDemoComponent },
];
