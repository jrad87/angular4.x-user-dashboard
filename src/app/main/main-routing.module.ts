import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OuterAuthGuard } from '../../services/outer-auth-guard.service';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const mainRoutes: Routes = [
	{	path: '',
		component: MainComponent,
		children: [{
			path: '',
			children: [
				{ path: 'home', canActivate: [OuterAuthGuard], component: HomeComponent },
				{ path: 'login',  canActivate: [OuterAuthGuard], component: LoginComponent },
				{ path: 'register',  canActivate: [OuterAuthGuard], component: RegistrationComponent},
				{ path: '', redirectTo: '/home', pathMatch: 'full'}
			]
		}]
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(mainRoutes)
	],
	exports: [
		RouterModule
	]
})
export class MainRoutingModule {}
