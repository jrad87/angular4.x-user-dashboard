import {  Component } from '@angular/core';

@Component({
	template:`
		<app-main-nav></app-main-nav>
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	` 
})
export class MainComponent {}
