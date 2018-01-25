import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieModule, CookieService } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './main/main.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorsModule } from './errors/errors.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ErrorsModule,
		MainModule,
		DashboardModule,
		CookieModule.forRoot(),
		AppRoutingModule
	],
	providers: [
		CookieService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
