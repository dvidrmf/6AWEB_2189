import { Routes } from '@angular/router';
import { Home } from './home/home';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'directives', component: Directives},
    {path: 'data-binding', component: DataBinding}
];
