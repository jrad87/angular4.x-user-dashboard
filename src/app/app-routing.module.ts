import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorsComponent } from './errors/errors.component';

const appRoutes: Routes = [
	{path: '', loadChildren: 'app/main/main.module#MainModule'},
	{path: '**', redirectTo: '/error' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
