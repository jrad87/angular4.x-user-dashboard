import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { OuterAuthGuard } from '../services/outer-auth-guard.service';

import { MainRoutingModule } from './main-routing.module';

import { MainNavComponent } from './nav/main-nav.component';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MainRoutingModule
	],
	declarations: [
		MainNavComponent,
		MainComponent,
		HomeComponent,
		LoginComponent,
		RegistrationComponent
	],
	providers: [
		AuthService,
		OuterAuthGuard
	]
})
export class MainModule {}
