import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';
import { InnerAuthGuard } from 'services/inner-auth-guard.service';
import { UserBlockGuard } from 'services/user-block-guard.service';
import { MessageService } from 'services/message.service';
import { CommentService } from 'services/comment.service';
import { ProfileService } from 'services/profile.service';
import { FriendService } from 'services/friend.service';
import { NotificationService } from 'services/notification.service';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardNavComponent } from './nav/dashboard-nav.component';
import { DashboardComponent } from './dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ShowProfileComponent } from './show-user/show-profile/show-profile.component';
import { PostMessageComponent } from './show-user/post-message/post-message.component';
import { EditMessageFormComponent } from './show-user/show-message/edit-message-form.component'
import { ShowMessageComponent } from './show-user/show-message/show-message.component';
import { PostCommentComponent } from './show-user/show-message/post-comment.component';
import { ShowCommentComponent } from './show-user/show-message/show-comment.component';
import { MessageActionsComponent } from './show-user/show-message/message-actions.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
 
import { AutofocusDirective } from '../directives/autofocus.directive'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		DashboardRoutingModule
	],
	declarations: [
		DashboardNavComponent,
		DashboardComponent,
		AllUsersComponent,
		ShowUserComponent,
		ShowProfileComponent,
		EditMessageFormComponent,
		PostMessageComponent,
		ShowMessageComponent,
		PostCommentComponent,
		ShowCommentComponent,
		MessageActionsComponent,
		AutofocusDirective,
		UserSettingsComponent
	],
	providers: [
		AuthService,
		UserService,
		MessageService,
		CommentService,
		ProfileService,
		FriendService,
		NotificationService,
		InnerAuthGuard,
		UserBlockGuard
	]
})
export class DashboardModule {}
