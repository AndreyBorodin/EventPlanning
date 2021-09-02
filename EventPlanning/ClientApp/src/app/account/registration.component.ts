import {Component, NgZone, OnInit, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {User} from '../../models/model.dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  user: User;
  @Output()
  onAuthorization = new EventEmitter();

  constructor(
    private sharedService: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.user = new User();
  }
  registration() {
    if(this.user.login != '' && this.user.password != '' && this.user.userName != '') {
      this.sharedService.addUser(this.user).subscribe(data => {
        if (data != null) {
          this.sharedService.user.login = this.user.login;
          this.sharedService.user.password = this.user.password;
          this.onAuthorization.emit();
        }
      });
    }
  }
  authorization() {
    this.onAuthorization.emit();
  }

}
