import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from 'services/auth.service';

import { ErrorsRoutingModule } from './errors-routing.module';

import { ErrorsComponent } from './errors.component';
import { ErrorsNavComponent } from './errors-nav.component';
import { PageNotFoundComponent } from './404.component';

@NgModule({
	imports: [
		HttpModule,
		ErrorsRoutingModule
	],
	declarations: [
		ErrorsComponent,
		ErrorsNavComponent,
		PageNotFoundComponent
	],
	providers: [
		AuthService
	]
})
export class ErrorsModule {}
