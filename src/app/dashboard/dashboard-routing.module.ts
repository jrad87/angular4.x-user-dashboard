import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InnerAuthGuard } from 'services/inner-auth-guard.service';
import { UserBlockGuard } from 'services/user-block-guard.service';
import { ShowUserResolver } from 'services/show-user-resolver.service';

import { DashboardComponent } from './dashboard.component';

import { AllUsersComponent } from './all-users/all-users.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const dashboardRoutes: Routes = [
	{	path: 'dashboard', 
		component: DashboardComponent,
		canActivate: [InnerAuthGuard],
		children: [{
			path:'',
			children: [
				{ path: '', component: AllUsersComponent},
				{ 	
					path: 'users/:id', 
					component: ShowUserComponent, 
					/* canActivate: [UserBlockGuard], */
					resolve: {
						user: ShowUserResolver
					}
				},
				{ path : 'settings', component: UserSettingsComponent }				
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
	],
	providers: [
		ShowUserResolver
	]
})
export class DashboardRoutingModule {}
