import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'app';
	constructor(
		private _router: Router,
	){}
	ngOnInit(){
		this._router.events.subscribe( e => {
			if (e instanceof NavigationEnd) window.scrollTo(0, 0);
		})
	}
}
