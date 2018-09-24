import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InnerAuthGuard } from '../services/inner-auth-guard.service';
import { UserBlockGuard } from 'services/user-block-guard.service';

import { DashboardComponent } from './dashboard.component';

import { AllUsersComponent } from './all-users/all-users.component';
import { ShowUserComponent } from './show-user/show-user.component';

const dashboardRoutes: Routes = [
	{	path: 'dashboard', 
		component: DashboardComponent,
		canActivate: [InnerAuthGuard],
		children: [{
			path:'',
			children: [
				{ path: '', component: AllUsersComponent},
				{ path: 'users/:id', component: ShowUserComponent, canActivate: [UserBlockGuard] }
			]
		}]
	}
]; 

@NgModule({
	imports: [
		RouterModule.forChild(dashboardRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DashboardRoutingModule {}
