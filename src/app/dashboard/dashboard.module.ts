import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { InnerAuthGuard } from 'app/services/inner-auth-guard.service';
import { MessageService } from 'app/services/message.service';
import { CommentService } from 'app/services/comment.service';
import { ProfileService } from 'app/services/profile.service';
import { FriendService } from 'services/friend.service';
import { NotificationService } from 'services/notification.service';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardNavComponent } from './nav/dashboard-nav.component';
import { DashboardComponent } from './dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ShowProfileComponent } from './show-user/show-profile/show-profile.component';
import { PostMessageComponent } from './show-user/post-message/post-message.component';
import { ShowMessageComponent } from './show-user/show-message/show-message.component';
import { PostCommentComponent } from './show-user/show-message/post-comment.component';
import { ShowCommentComponent } from './show-user/show-message/show-comment.component';
import { MessageActionsComponent } from './show-user/show-message/message-actions.component';

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
		PostMessageComponent,
		ShowMessageComponent,
		PostCommentComponent,
		ShowCommentComponent,
		MessageActionsComponent,
		AutofocusDirective
	],
	providers: [
		AuthService,
		UserService,
		MessageService,
		CommentService,
		InnerAuthGuard,
		ProfileService,
		FriendService,
		NotificationService
	]
})
export class DashboardModule {}
