import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorsComponent } from './errors.component';
import { PageNotFoundComponent } from './404.component';

const errorsRoutes: Routes = [
	{	
		path: 'error', 
		component: ErrorsComponent,
		children: [
			{path: '', component: PageNotFoundComponent},	
		]
	},
	
	//{path: '**', redirectTo: '/error'}
]

@NgModule({
	imports: [
		RouterModule.forChild(errorsRoutes)
	],
	exports: [
		RouterModule
	],
})
export class ErrorsRoutingModule {}
