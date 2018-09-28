import {
	Component,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { ProfileService } from 'services/profile.service';
import { User } from 'classes/user';

class Profile {
	profilePic: string;
}

@Component({
	selector: 'app-show-profile',
	templateUrl: './show-profile.component.html',
	styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnChanges {
	@Input() user;
	profile: Profile = new Profile();
	constructor(
		private _profile: ProfileService
	) {}
	ngOnInit() {
		this._profile.show(this.user.profile)
			.then(profile => {
				this.profile = profile
			})
			.catch(console.log);
	}
	ngOnChanges(changes: SimpleChanges) {
		//console.log(changes);
		if (changes.user && changes.user.currentValue && !changes.user.firstChange ) {
			this._profile.show(this.user.profile)
				.then(profile => {
					this.profile = profile;
				})
				.catch(console.log);
		}
	}
}
